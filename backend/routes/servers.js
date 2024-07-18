var express = require('express');
var router = express.Router();

var sqlUtils = require('../utils/sqlUtils');
var httpUtils = require('../utils/httpUtils');

router.get('/getAll', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.query, ['token'], req.query.token, "global", "helper", false, true, res))) return;

    var serversQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT id, name, port, code, domainIp, launchCommand, nodeId FROM servers');
    var servers = [];

    for(var serverResult of serversQuery) {
        servers.push({
            id: serverResult.id,
            name: serverResult.name,
            port: serverResult.port,
            code: serverResult.code,
            domainIp: serverResult.domainIp,
            launchCommand: serverResult.launchCommand,
            nodeId: serverResult.nodeId
        });
    }

    res.status(200);
    res.send({
        success: true,
        servers: servers
    });
});

router.get('/get', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.query, ['token', 'id'], req.query.token, "global", "helper", false, true, res))) return;

    var serversQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT id, name, port, code, domainIp, launchCommand, nodeId FROM servers WHERE id = ?', [req.query.id]);
    
    if(Array.isArray(serversQuery) && serversQuery.length > 0) {
        var serverResult = serversQuery[0];
        var server = {
            id: serverResult.id,
            name: serverResult.name,
            port: serverResult.port,
            code: serverResult.code,
            domainIp: serverResult.domainIp,
            launchCommand: serverResult.launchCommand,
            nodeId: serverResult.nodeId
        };

        res.status(200);
        res.send({
            success: true,
            server: server
        });
        return;
    } else {
        res.status(404);
        res.send({
            success: false,
            error: 'Server Not Found.'
        });
        return;
    }
});

router.post('/addServer', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'name', 'port', 'code', 'domainIp', 'launchCommand', 'nodeId'], req.body.token, "global", "owner", true, true, res))) return;

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'INSERT INTO servers (name, port, code, domainIp, launchCommand, nodeId) VALUES (?, ?, ?, ?, ?, ?)', [req.body.name, req.body.port, req.body.code, req.body.domainIp, req.body.launchCommand, req.body.nodeId]);

    res.status(200);
    res.send({
        success: true
    });
    return;
});

router.post('/removeServer', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'id'], req.body.token, "global", "owner", true, true, res))) return;

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'DELETE FROM servers WHERE id = ?', [req.body.id]);

    res.status(200);
    res.send({
        success: true
    });
    return;
});

router.post('/editServer', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'id', 'name', 'port', 'code', 'domainIp', 'launchCommand', 'nodeId'], req.body.token, "global", "owner", true, true, res))) return;

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'UPDATE servers SET name = ?, port = ?, code = ?, domainIp = ?, launchCommand = ?, nodeId = ? WHERE id = ?', [req.body.name, req.body.port, req.body.code, req.body.domainIp, req.body.launchCommand, req.body.nodeId, req.body.id]);

    res.status(200);
    res.send({
        success: true
    });
    return;
});

module.exports = router;