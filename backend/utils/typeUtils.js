module.exports = {
    convertToBoolean : function(str, def) {
        str = typeof str === 'string' ? str.toLowerCase().trim() : str;
        switch(str) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            case false:
            case "false":
            case 0:
            case "0":
            case "off":
            case "no":
                return false;
            default:
                return def;
        }
    }
}