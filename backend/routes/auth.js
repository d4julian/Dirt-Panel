var express = require('express');
var router = express.Router();

var fetch = require('node-fetch');
var formData = require('form-data');
var jwt = require('jsonwebtoken');

var sqlUtils = require('../utils/sqlUtils');
var secret = require('../utils/secretUtils');
var permissionsUtils = require('../utils/permissionsUtils');
var typeUtils = require('../utils/typeUtils');
var httpUtils = require('../utils/httpUtils');

function getErroredAuthenticateResponse(error) {
    return {
        authenticated: false,
        userData: {
            username: '',
            profilePicture: ''
        },
        authError: error
    };
}

router.get('/', function(req, res, next) {
    res.status(400);
    res.send('Invalid Endpoint');
});

router.post('/authenticate', async (req, res) => {
    // Make sure code was passed
    // TODO Add Discord OAuth State Param to prevent cross-site auth hacks
    if(!httpUtils.hasRequiredArgs(req.body, ['code'])) {
        res.status(422);
        res.send(getErroredAuthenticateResponse('MISSING_CODE'));
        return;
    }

    // Prepare a Discord Auth request
    const authBody = new formData();
    authBody.append('client_id', process.env.DISCORD_CLIENT_ID);
    authBody.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
    authBody.append('grant_type', 'authorization_code');
    authBody.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);
    authBody.append('code', req.body.code);

    // Submit the Discord Authentication request
    var authResponse = await fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: authBody
    }).then(response => response.json());

    // Check if the request was successful
    if(!('access_token' in authResponse)) {
        res.status(401);
        res.send(getErroredAuthenticateResponse('AUTHENTICATION_FAILED'));
        return;
    }

    // Fetch the user's Discord information
    var userInfoResponse = await fetch('https://discordapp.com/api/users/@me', {
        headers: {
            authorization: `${authResponse.token_type} ${authResponse.access_token}`
        }
    }).then(response => response.json());

    // Check if the account exists and is disabled
    var panelUsers = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT enabled, lastLoginUsername FROM users WHERE discord = ?', [userInfoResponse.id]);
    var needToAddOrUpdatePanelUser = true;

    var lastLoggedUUID = '';

    if(Array.isArray(panelUsers) && panelUsers.length > 0) {
        needToAddOrUpdatePanelUser = false;
        for(var row of panelUsers) {
            if(row.lastLoginUsername != userInfoResponse.username) needToAddOrUpdatePanelUser = true;
            lastLoggedUUID = row.lastLoginUUID;
            if(!typeUtils.convertToBoolean(row.enabled, true)) {
                res.status(401);
                res.send(getErroredAuthenticateResponse('USER_DISABLED'));
                return;
            }

        }
    }

    // Get the user's MC UUID
    var verifications = await sqlUtils.runSqlQuery(process.env.SQL_PLAYERDATA_DB_NAME, 'SELECT uuid FROM verification WHERE discordid = ?', [userInfoResponse.id]);
    if(Array.isArray(verifications) && verifications.length > 0) {
        var mcuuid = verifications[0].uuid;
        if(lastLoggedUUID != mcuuid) needToAddOrUpdatePanelUser = true;
    } else {
        res.status(401);
        res.send(getErroredAuthenticateResponse('USER_NOT_VERIFIED'));
        return;
    }

    // Get the user's LuckPerms permissions
    var perms = await permissionsUtils.getLuckPermsPermissions(mcuuid);
    if(perms.permissions.length < 1) {
        res.status(401);
        res.send(getErroredAuthenticateResponse('USER_NOT_STAFF'));
        return;
    }

    if(needToAddOrUpdatePanelUser) {
        await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'INSERT INTO users (discord, lastLoginUsername, lastLoginUUID) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE lastLoginUsername = ?, lastLoginUUID = ?', [userInfoResponse.id, userInfoResponse.username, mcuuid, userInfoResponse.username, mcuuid]);
    }

    var response = {
        authenticated: true,
        userData: {
            username: userInfoResponse.username,
            profilePicture: `https://cdn.discordapp.com/avatars/${userInfoResponse.id}/${userInfoResponse.avatar}`,
            mcuuid: mcuuid,
            discordId: userInfoResponse.id,
            discordName: userInfoResponse.username
        },
        authData: {
            token: jwt.sign({
                authToken: authResponse.access_token,
                authTokenType: authResponse.token_type,
                discordId: userInfoResponse.id,
                discordName: userInfoResponse.username,
                mcuuid: mcuuid,
                permissions: perms.permissions,
                highestRank : perms.highestRank
            }, secret.getSecret(), { expiresIn: '24h' })
        },
        permissions: perms.permissions,
        highestRank: perms.highestRank
    };

    res.status(200);
    res.send(response);
    return;
});

router.get('/verifyPerms', async (req, res) => {
    if(!httpUtils.hasRequiredArgs(req.query, ['token', 'server', 'requiredRank'])) {
        res.status(422);
        res.send({
            accepted: false,
            error: 'Invalid Arguments.'
        });
        return;
    }

    var requireCheck = 'requireCheck' in req.query ? typeUtils.convertToBoolean(req.query.requireCheck, true) : true;
    var useHighestRank = 'useHighestRank' in req.query ? typeUtils.convertToBoolean(req.query.useHighestRank, false) : false;

    var verificationResults = await permissionsUtils.verifyPerms(req.query.token, req.query.server, req.query.requiredRank, requireCheck, useHighestRank);

    if(!verificationResults.success || !verificationResults.accepted) {
        res.status(verificationResults.status);
        res.send({
            accepted: false,
            error: verificationResults.error
        });
        return;
    }

    if('isFTP' in req.query ? typeUtils.convertToBoolean(req.query.isFTP, false) : false) {
        if(!(await permissionsUtils.whitelistedForFTP(verificationResults.decodedToken.discordId))) {
            res.status(401);
            res.send({
                accepted: false,
                error: 'Not Whitelisted for FTP.'
            });
            return;
        }
    }

    if('isConsole' in req.query ? typeUtils.convertToBoolean(req.query.isConsole, false) : false) {
        if(!(await permissionsUtils.whitelistedForConsole(verificationResults.decodedToken.discordId))) {
            res.status(401);
            res.send({
                accepted: false,
                error: 'Not Whitelisted for Console.'
            });
            return;
        }
    }

    res.status(200);
    res.send({
        accepted: true
    });
    return;
});

module.exports = router;