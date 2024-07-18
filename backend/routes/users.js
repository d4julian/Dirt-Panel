var express = require('express');
var router = express.Router();

var permissionsUtils = require('../utils/permissionsUtils');
var sqlUtils = require('../utils/sqlUtils');
var httpUtils = require('../utils/httpUtils');

router.get('/getAll', async (req, res) => {
    if(!httpUtils.verifyPermissionsAndArgs(req.query, ['token'], req.query.token, "global", "owner", false, true, res)) return;

    var usersQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT discord, lastLoginUsername, lastLoginUUID, enabled, console, ftp FROM users');
    var users = [];

    for(var userResult of usersQuery) {

        var perms = await permissionsUtils.getLuckPermsPermissions(userResult.lastLoginUUID);

        users.push({
            discord: userResult.discord,
            lastLoginUsername: userResult.lastLoginUsername,
            enabled: userResult.enabled,
            console: userResult.console,
            ftp: userResult.ftp,
            highestRank: perms.highestRank
        });
    }

    res.status(200);
    res.send({
        success: true,
        users: users
    });
});

router.post('/editUser', async (req, res) => {
    if(!httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'discord', 'enabled', 'console', 'ftp'], req.body.token, 'global', 'owner', true, true, res)) return;

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'UPDATE users SET enabled = ?, console = ?, ftp = ? WHERE discord = ?', [req.body.enabled, req.body.console, req.body.ftp, req.body.discord]);

    res.status(200);
    res.send({
        success: true
    });
    return;
})

router.post('/removeUser', async (req, res) => {
    if(!httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'discord'], req.body.token, 'global', 'owner', true, true, res)) return;

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'DELETE FROM users WHERE discord = ?', [req.body.discord]);

    res.status(200);
    res.send({
        success: true
    });
    return;
})

module.exports = router;