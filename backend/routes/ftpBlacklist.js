var express = require('express');
var router = express.Router();

var sqlUtils = require('../utils/sqlUtils');
var httpUtils = require('../utils/httpUtils');
var typeUtils = require('../utils/typeUtils');

router.get('/getAll', async function(req, res) {
    var ftpBlacklistQuery = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT * FROM ftp_blacklist');
    res.status(200);
    res.send({
        success: true,
        blacklistEntries: ftpBlacklistQuery
    });
    return;
});

// TODO Test
router.post('/add', async function(req, res) {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'path', 'isDirectory'], req.body.token, "global", "owner", true, true, res))) return;

    try {
        await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'INSERT INTO ftp_blacklist (path, isDirectory) VALUES (?, ?)', [req.body.path, typeUtils.convertToBoolean(req.body.isDirectory, false)], true);

        res.status(200);
        res.send({
            success: true
        });
        return;
    } catch (error) {
        res.status(409);
        res.send({
            success: false
        });
    }
});

// TODO Test
router.post('/remove', async function(req, res) {
    if(!(await httpUtils.verifyPermissionsAndArgs(req.body, ['token', 'id'], req.body.token, "global", "owner", true, true, res))) return;

    await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'DELETE FROM ftp_blacklist WHERE id = ?', [req.body.id]);

    res.status(200);
    res.send({
        success: true
    });
    return;
});

module.exports = router;
