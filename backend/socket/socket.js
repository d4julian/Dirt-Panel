var socketUtils = require('../utils/socketUtils');
var daemons = require('./daemons');

async function websocketServer(server) {
    var socketIO = require('socket.io')(server);

    socketIO.of('/daemons')
        .use(socketUtils.authSocketConnection)
        .on('connection', async (socket) => await daemons.connect(socket, socketIO));
}

module.exports = {websocketServer};