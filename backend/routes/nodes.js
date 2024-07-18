var express = require('express');
var router = express.Router();

var sqlUtils = require('../utils/sqlUtils');
var httpUtils = require('../utils/httpUtils');
var typeUtils = require('../utils/typeUtils');

router.get('/getAll', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.query, ['token'], req.query.token, "global", "helper", false, true, res))) return;

    var nodesQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT id, name, ip, ftpPort, concurrentFtpCons FROM nodes');
    var nodes = [];

    for(var nodeResult of nodesQuery) {
        var serverQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT id, name, port, code, domainIp, launchCommand FROM servers WHERE nodeId = ?', [nodeResult.id]);
        var servers = [];

        for(var serverResult of serverQuery) {
            servers.push({
                id: serverResult.id,
                name: serverResult.name,
                port: serverResult.port,
                code: serverResult.code,
                launchCommand: serverResult.launchCommand,
                domainIp: serverResult.domainIp
            });
        };

        nodes.push({
            id: nodeResult.id,
            name: nodeResult.name,
            ip: nodeResult.ip,
            ftpPort: nodeResult.ftpPort,
            concurrentFtpCons : nodeResult.concurrentFtpCons,
            servers: servers
        });
    }

    res.status(200);
    res.send({
        success: true,
        nodes: nodes
    });
    return;
});

router.get('/get', async (req, res) => {
    if(!httpUtils.verifyPermissionsAndArgs(req.query, ['token', 'id'], req.query.token, "global", "helper", false, true, res)) return;

    var nodesQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT id, name, ip, ftpPort, concurrentFtpCons FROM nodes WHERE id = ?', [req.query.id]);

    if(!(Array.isArray(nodesQuery) && nodesQuery.length > 0)) {
        res.status(404);
        res.send({
            success: false,
            error: 'Node Not Found.'
        });
        return;
    }
    
    var nodeResult = nodesQuery[0];
    var node = {
        id: nodeResult.id,
        name: nodeResult.name,
        ip: nodeResult.ip,
        ftpPort: nodeResult.ftpPort,
        concurrentFtpCons : nodeResult.concurrentFtpCons
    };

    if('getServers' in req.query ? typeUtils.convertToBoolean(req.query.getServers, false) : false) {
        var serverQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT id, name, port, code, domainIp, launchCommand FROM servers WHERE nodeId = ?', [nodeResult.id]);
        var servers = [];

        for(var serverResult of serverQuery) {
            servers.push({
                id: serverResult.id,
                name: serverResult.name,
                port: serverResult.port,
                code: serverResult.code,
                launchCommand: serverResult.launchCommand,
                domainIp: serverResult.domainIp
            });
        };

        node['servers'] = servers;
    }
    res.status(200);
    res.send({
        success: true,
        node: node
    });
    return;
});

router.post('/addNode', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'name', 'ip', 'ftpPort'], req.body.token, "global", "owner", true, true, res))) return;

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'INSERT INTO nodes (name, ip, ftpPort) VALUES (?, ?, ?)', [req.body.name, req.body.ip, parseInt(req.body.ftpPort)]);

    res.status(200);
    res.send({
        success: true
    });
    return;
});

router.post('/removeNode', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'id'], req.body.token, "global", "owner", true, true, res))) return;

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'DELETE FROM nodes WHERE id = ?', [req.body.id]);

    res.status(200);
    res.send({
        success: true
    });
    return;
});

router.post('/editNode', async (req, res) => {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'id'], req.body.token, "global", "owner", true, true, res))) return;

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'UPDATE nodes SET name = ?, ip = ?, ftpPort = ? WHERE id = ?', [req.body.name, req.body.ip, req.body.ftpPort, req.body.id]);

    res.status(200);
    res.send({
        success: true
    });
    return;
});

module.exports = router;