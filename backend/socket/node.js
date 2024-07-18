var socketUtils = require('../utils/socketUtils');

var nodes = [];
var nodesWithRunningHeartbeats = [];

var savedHeartbeats = new Map();

var cpuUsages = new Map();
var nodeStatuses = new Map();

function runHeartbeatCheck(socket, nodeID) {
    // A heartbeat has been received
    if(savedHeartbeats.get(nodeID)) {
        // Consume the heartbeat
        savedHeartbeats.set(nodeID, false);

        // If we already knew the node was online, nothing changes
        if(nodeStatuses.get(nodeID)) {
            return;
        }

        // The node is now online
        nodeStatuses.set(nodeID, true);
        socket.broadcast.emit('nodeStatus', true);
    // No heartbeat received
    } else {
        // If we already knew the node was down, nothing changes
        if(!nodeStatuses.get(nodeID)) {
            return;
        }

        // The node is now down
        nodeStatuses.set(nodeID, false);
        cpuUsages.set(0);
        socket.broadcast.emit('nodeStatus', false);
        socket.broadcast.emit('cpuUsage', 0);
        return;
    }
}

function addNode(socket, socketIO, nodeID) {
    if(!socketUtils.servicePermissionsCheck(socket)) return;

    savedHeartbeats.set(nodeID, true);
    cpuUsages.set(nodeID, 0);

    if(!nodes.includes(nodeID)) {
        nodes.push(nodeID);

        nodeStatuses.set(nodeID, true);

        socketIO.of(`/nodes/${nodeID}`)
            .use(socketUtils.authSocketConnection)
            .on('connection', (socket) => connect(socket, nodeID));
    }

    socket.emit(`Node_${nodeID}_Ready`);
}

function nodeHeartbeat(socket, nodeID) {
    if(savedHeartbeats.get(nodeID)) return;
    if(!socketUtils.servicePermissionsCheck(socket)) return;
    savedHeartbeats.set(nodeID, true);
}

async function connect(socket, nodeID) {
    // The permissions check is to ensure this is a service, not a user.
    if(!nodesWithRunningHeartbeats.includes(nodeID) && socketUtils.servicePermissionsCheck(socket)) {
        nodesWithRunningHeartbeats.push(nodeID);
        setInterval(() => runHeartbeatCheck(socket, nodeID), 5 * 1000);
    }

    socket.emit('cpuUsage', cpuUsages.get(nodeID));
    socket.emit('nodeStatus', nodeStatuses.get(nodeID));

    socket.on('cpuUsage', (usage) => { socketUtils.addToMapAndBroadcast(cpuUsages, nodeID, socket, 'cpuUsage', usage); });

    socket.on('getNodeStatus', () => socket.emit('nodeStatus', nodeStatuses.get(nodeID)));

    socket.on('nodeHeartbeat', () => nodeHeartbeat(socket, nodeID));
}

module.exports = {addNode}