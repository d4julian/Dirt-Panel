var permissionsUtils = require('../utils/permissionsUtils');

async function authSocketConnectionUser(socket, token) {
    var permissionsCheck = await permissionsUtils.verifyPerms(token, "global", "helper", true, true);

    if(!permissionsCheck.success || !permissionsCheck.accepted) return false;

    socket.panelAuthMode = "user";
    socket.panelAuthToken = token;
    return true;
}

function authSocketConnectionService(socket, token) {
    var valid = (token == process.env.SOCKET_CONN_TOKEN);
    if(valid) {
        socket.panelAuthMode = "service";
    }
    return valid;
}

module.exports = {
    authSocketConnection : async function(socket, next) {
        var authenticated = false;
        if(socket.handshake.query && socket.handshake.query.token) {
            var token = socket.handshake.query.token;
            if(authSocketConnectionService(socket, token)) authenticated = true;
            else if(await authSocketConnectionUser(socket, token)) authenticated = true;
        }

        if(authenticated) next();
        else next(Error("Unable to authenticate socket connection."));
    },
    userPermissionsCheck : async function(server, requiredRank, requireCheck, useHighestRank, socket) {
        if(socket.panelAuthMode !== "user") return false;

        var permissionsCheck = await permissionsUtils.verifyPerms(socket.panelAuthToken, server, requiredRank, requireCheck, useHighestRank);
        if(!permissionsCheck.success || !permissionsCheck.accepted) return false;

        return true;
    },
    servicePermissionsCheck : function(socket) {
        return socket.panelAuthMode === "service";
    },
    broadcastAfterUserPermissionsCheck : async function(server, requiredRank, requireCheck, useHighestRank, socket, message, ...args) {
        if(!(await this.userPermissionsCheck(server, requiredRank, requireCheck, useHighestRank, socket))) return;

        socket.broadcast.emit(message, ...args);
    },
    broadcastAfterServicePermissionsCheck : function(socket, message, ...args) {
        if(this.servicePermissionsCheck(socket)) socket.broadcast.emit(message, ...args);
    },
    addToMapAndBroadcast(map, key, socket, message, arg) {
        if(!this.servicePermissionsCheck(socket)) return;
    
        map.set(key, arg);
    
        socket.broadcast.emit(message, arg);
    }
}