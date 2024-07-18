var sqlUtils = require('../utils/sqlUtils');
var secret = require('../utils/secretUtils');
var jwt = require('jsonwebtoken');
const typeUtils = require('./typeUtils');

var staffGroups = ['helper', 'moderator', 'admin', 'manager', 'owner'];
var ownerUUIDs = ['c3978635-3ff4-49eb-9bc9-16577916ddaf', '087f0c8f-70ed-4d96-bad4-6c4dc40aca2d'];

var permissionsMap = new Map();

for (var i = 0; i < staffGroups.length; i++) {
    permissionsMap.set(staffGroups[i], i);
}

module.exports = {
    getStaffGroups: function () {
        return staffGroups;
    },
    hasPermission: function (rank, desiredRank) {
        if (!(permissionsMap.has(rank) && permissionsMap.has(desiredRank))) return false;
        return permissionsMap.get(rank) >= permissionsMap.get(desiredRank);
    },
    getHighestRank: function (ranks) {
        if (Array.isArray(ranks) && ranks.length >= 1) {
            var highestRank = -1;
            var foundRank = false;
            ranks.forEach(rank => {
                if (permissionsMap.get(rank) > highestRank) {
                    foundRank = true;
                    highestRank = permissionsMap.get(rank);
                }
            });

            return foundRank ? staffGroups[highestRank] : 'unranked';
        }
    },
    hasPermissionOnServer: function (desiredRank, server, permissions) {
        if (Array.isArray(permissions) && permissions.length >= 1) {
            for (let permission of permissions) {
                if (permission.server == server || permission.server == 'global') {
                    if (this.hasPermission(permission.rank, desiredRank)) return true;
                }
            }
        }
        return false;
    },
    // Gets perms from a specific table prefix (LUCKPERMS_, PIXELMON_, etc.)
    getLuckPermsPermissionsWithPrefix: async function (prefix, uuid) {
        var permissionsResults = await sqlUtils.runSqlQuery(process.env.SQL_LUCKPERMS_DB_NAME, `SELECT permission, server FROM ${prefix}_user_permissions WHERE uuid = ? AND value = ?`, [uuid, 1]);

        var permissions = [];
        var ranks = [];

        if (Array.isArray(permissionsResults) && permissionsResults.length > 0) {
            for (var result of permissionsResults) {
                var splitPerm = result.permission.split(".");
                if (splitPerm[0] == 'group') {
                    if (this.getStaffGroups().includes(splitPerm[1])) {
                        permissions.push({
                            server: result.server,
                            rank: splitPerm[1]
                        });
                        ranks.push(splitPerm[1]);
                    }
                }
            }

        }
        return {
            permissions: permissions,
            ranks: ranks
        };
    },
    getLuckPermsPermissions: async function (uuid) {
        var ftbPermissionsResults = await this.getLuckPermsPermissionsWithPrefix(process.env.SQL_FTB_LUCKPERMS_PREFIX, uuid);
        var pixelmonPermissionsResults = await this.getLuckPermsPermissionsWithPrefix(process.env.SQL_PIXELMON_LUCKPERMS_PREFIX, uuid);

        // We have to override the pixelmon permissions array to turn global into just redstone + glowstone
        var pixelmonPermissions = [];
        for (let permission of pixelmonPermissionsResults.permissions) {
            if (permission.server === 'global') {
                pixelmonPermissions.push({
                    server: 'redstone',
                    rank: permission.rank
                });
                pixelmonPermissions.push({
                    server: 'glowstone',
                    rank: permission.rank
                });
            } else {
                console.log("ERROR! User with permissions on only one pixelmon server detected! The system was not built for this, as it did not exist at the time of writing. Please contact Tech ASAP!");
            }
        }

        var highestRank = this.getHighestRank([...ftbPermissionsResults.ranks, ...pixelmonPermissionsResults.ranks]);
        
        if(highestRank === "owner" && process.env.ENVIRONMENT) {
            if(!ownerUUIDs.includes(uuid)) return{
                permissions: [],
                highestRank: 'unranked'
            }
        }

        return {
            permissions: [...ftbPermissionsResults.permissions, ...pixelmonPermissions],
            highestRank: highestRank
        };
    },
    verifyPerms: async function (token, server, requiredRank, requireCheck, useHighestRank) {
        try {
            var decodedToken = jwt.verify(token, secret.getSecret());
        } catch (err) {
            return {
                success: false,
                status: 401,
                error: 'Invalid Token.'
            };
        }

        var permissions = decodedToken.permissions;
        var highestRank = decodedToken.highestRank;

        if (requireCheck) {
            var perms = await this.getLuckPermsPermissions(decodedToken.mcuuid);
            if (perms.permissions.length < 1) {
                return {
                    success: false,
                    status: 401,
                    error: 'Permissions Not Found.'
                };
            }
            permissions = perms.permissions;
            highestRank = perms.highestRank;
        }

        if (useHighestRank ? this.hasPermission(highestRank, requiredRank) : this.hasPermissionOnServer(requiredRank, server, permissions)) {
            return {
                success: true,
                status: 400,
                accepted: true,
                decodedToken: decodedToken
            };
        } else {
            return {
                success: true,
                status: 401,
                error: 'Access Denied.',
                accepted: false,
            };
        }
    },
    whitelistedForFTP : async function (discordId) {
        var panelUsers = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT ftp FROM users WHERE discord = ? AND enabled = ?', [discordId, 1]);
        if(!(Array.isArray(panelUsers) && panelUsers.length > 0)) return false;
        for(let row of panelUsers) {
            if(!typeUtils.convertToBoolean(row.ftp)) return false;
        }

        return true;
    },
    whitelistedForConsole : async function(discordId) {
        var panelUsers = await sqlUtils.runSqlQuery(process.env.SQL_PANEL_DB_NAME, 'SELECT console FROM users WHERE discord = ? AND enabled = ?', [discordId, 1]);
        if(!(Array.isArray(panelUsers) && panelUsers.length > 0)) return false;
        for(let row of panelUsers) {
            if(!typeUtils.convertToBoolean(row.console)) return false;
        }

        return true;
    }
}