var express = require('express');
var router = express.Router();

var moment = require('moment');
var jwt = require('jsonwebtoken');

var sqlUtils = require('../utils/sqlUtils');
var httpUtils = require('../utils/httpUtils');
var secret = require('../utils/secretUtils');

router.get('/getAllPending', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.query, ['token'], req.query.token, "global", "helper", false, true, res))) return;

    var pendingSactionsQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT id, date, staffUsername, staffUUID, username, uuid, type, uuid, server FROM punishments WHERE complete = ? AND dismissed = ?', [0, 0]);
    var pendingSanctions = [];

    for(var pendingSanctionResult of pendingSactionsQuery) {
        pendingSanctions.push(pendingSanctionResult);
    }

    res.status(200);
    res.send({
        success: true,
        pendingSanctions: pendingSanctions
    });
});

router.post('/dismiss', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'id'], req.body.token, "global", "helper", true, true, res))) return;

    var pendingSanctionQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT id, editHistory FROM punishments WHERE dismissed = ? AND id = ?', [0, req.body.id]);
    if(!(Array.isArray(pendingSanctionQuery) && pendingSanctionQuery.length > 0)) {
        res.status(404);
        res.send({
            success: false,
            error: 'Punishment not found!'
        });
        return;
    }

    try {
        var decodedToken = jwt.verify(req.body.token, secret.getSecret());
    } catch (err) {
        console.log(err);
        res.status(401);
        res.send({
            success: false,
            error: 'Invalid Token.'
        });
        return;
    }

    var editHistory = JSON.parse(pendingSanctionQuery[0].editHistory);
    editHistory.push({
        discordid: decodedToken.discordId,
        time: moment().unix()
    });

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'UPDATE punishments SET dismissed = ?, editHistory = ? WHERE id = ?', [1, JSON.stringify(editHistory), req.body.id]);

    res.status(200);
    res.send({
        success: true
    });
});

module.exports = router;