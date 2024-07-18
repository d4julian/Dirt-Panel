var socketUtils = require('../utils/socketUtils');
var jwt = require('jsonwebtoken');
var secret = require('../utils/secretUtils');
var Queue = require('../types/queue');
var permissionsUtils = require('../utils/permissionsUtils');
var fs = require('fs');

var servers = [];

var consoles = new Map();
var playerCounts = new Map();
var ramUsages = new Map();
var serverStatuses = new Map();

function addServer(socket, socketIO, serverID) {
    if(!socketUtils.servicePermissionsCheck(socket)) return;

    consoles.set(serverID, new Queue());
    playerCounts.set(serverID, 0);
    ramUsages.set(serverID, 0);
    serverStatuses.set(serverID, "offline");

    if(!servers.includes(serverID)) {
        servers.push(serverID);

        socketIO.of(`/servers/${serverID}`)
            .use(socketUtils.authSocketConnection)
            .on('connection', (socket) => connect(socket, serverID));
    }

    socket.emit(`Server_${serverID}_Ready`);
}

async function consoleIn(socket, serverID, command) {
    if(!(await socketUtils.userPermissionsCheck(serverID, "admin", true, false, socket))) return;

    try {
        var token = socket.panelAuthToken;
        var decodedToken = jwt.verify(token, secret.getSecret());
    } catch (err) {
        return;
    }

    if(!(await permissionsUtils.whitelistedForConsole(decodedToken.discordId))) return;

    socket.broadcast.emit('consoleIn', command);

    let logDir = './logs/console'
    if(!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true});

    var timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    fs.appendFileSync(`${logDir}/${serverID}.txt`, `[${timestamp}][${decodedToken.discordName} <@${decodedToken.discordId}>] ${command}\n`);
}

function consoleOut(socket, serverID, message) {
    if(!socketUtils.servicePermissionsCheck(socket)) return;

    socket.broadcast.emit('consoleOut', message);

    consoles.get(serverID).add(message);
    if(consoles.get(serverID).size > 255) consoles.get(serverID).remove();
}

async function connect(socket, serverID) {
    socket.emit('fullConsole', consoles.get(serverID));
    socket.emit('playerCount', playerCounts.get(serverID));
    socket.emit('ramUsage', ramUsages.get(serverID));
    socket.emit('serverStatus', serverStatuses.get(serverID));

    // Server Output (Server -> User)
    socket.on('consoleOut', (message) => consoleOut(socket, serverID, message));
    // Server Input (User -> Server)
    // TODO Check for console permissions
    socket.on('consoleIn', async (command) => await consoleIn(socket, serverID, command));

    socket.on('playerCount', (count) => socketUtils.addToMapAndBroadcast(playerCounts, serverID, socket, 'playerCount', count));
    socket.on('ramUsage', (usage) => socketUtils.addToMapAndBroadcast(ramUsages, serverID, socket, 'ramUsage', usage));
    socket.on('serverStatus', (status) => socketUtils.addToMapAndBroadcast(serverStatuses, serverID, socket, 'serverStatus', status));

    socket.on('getPlayerCount', () => socket.emit('playerCount', playerCounts.get(serverID)));
}

module.exports = {addServer};