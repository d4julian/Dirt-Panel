module.exports = {
    convertToFullUUID : function(trimmedUUID) {
        return trimmedUUID.substring(0, 8)
            + '-' + trimmedUUID.substring(8, 12)
            + '-' + trimmedUUID.substring(12, 16)
            + '-' + trimmedUUID.substring(16, 20)
            + '-' + trimmedUUID.substring(20, 32);
    }
}