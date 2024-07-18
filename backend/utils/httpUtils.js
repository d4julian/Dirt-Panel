var permissionsUtils = require('../utils/permissionsUtils');

module.exports = {
    hasRequiredArgs : function(body, args) {
        for(var arg of args) {
            if(!(arg in body)) return false;
        }
        return true;
    },
    verifyPermissionsAndArgs : async function(body, args, token, server, requiredRank, requireCheck, useHighestRank, res) {
        if(!this.hasRequiredArgs(body, args)) {
            res.status(422);
            res.send({
                success: false,
                error: 'Missing Arguments.'
            });
            return false;
        }

        var verificationResults = await permissionsUtils.verifyPerms(token, server, requiredRank, requireCheck, useHighestRank);

        if(!(verificationResults.success && verificationResults.accepted)) {
            res.status(verificationResults.status);
            res.send({
                success: false,
                error: verificationResults.error
            });
            return false;
        }

        return true;
    }
}