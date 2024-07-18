export function getMaxMemoryFromLaunchCommand(launchCommand) {
    var regExp = /-Xmx\d+[gm]/i;
    var usageString = regExp.exec(launchCommand)[0].toLowerCase();
    var usage = parseInt(usageString.substring(4, usageString.length - 1));
    var unit = usageString.substring(usageString.length - 1);
    if(unit === "g") usage *= 1024;
    return usage;
}

export function getNumberAsCommaString(number) {
    return (number).toLocaleString('en');
}