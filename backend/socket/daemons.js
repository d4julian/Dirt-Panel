var socketUtils = require('../utils/socketUtils');
var server = require('./server');
var node = require('./node');

async function connect(socket, socketIO) {
    socket.on('startServer', async (serverID) => await socketUtils.broadcastAfterUserPermissionsCheck(serverID, "admin", true, false, socket, 'startServer', serverID));
    socket.on('stopServer', async (serverID) => await socketUtils.broadcastAfterUserPermissionsCheck(serverID, "admin", true, false, socket, 'stopServer', serverID));
    socket.on('killServer', async (serverID) => await socketUtils.broadcastAfterUserPermissionsCheck(serverID, "admin", true, false, socket, 'killServer', serverID));

    socket.on('addServer', (serverID) => server.addServer(socket, socketIO, serverID));
    socket.on('addNode', (nodeID) => node.addNode(socket, socketIO, nodeID));
}

module.exports = {connect};