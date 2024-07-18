var base64url = require('base64url');
var crypto = require('crypto');

if(process.env.ENVIRONMENT) {
    console.log("Environment: Production");
    var secret = base64url(crypto.randomBytes(64));
} else {
    console.log("Environment: Development");
    var secret = "MjEzICA5NyAgMzkgMjQ1IDIxNSAxNTQgIDY1IDEwNSAxOTUgMTU0ICAyMSAyMzcgIDIyIDE2MiAxODggIDE3IAoyMjMgIDk3IDE0NCAgNjEgMTIyIDE5NCAgNjYgIDMwIDIxMiAyMjUgMTc0IDE2MyAgMTEgIDg4IDE0MyAgIDQgCjE4MSAxNjggMTU1ICA5NiAgODUgICA1IDIxNyAxNTQgMTU2IDEzOSAgNjUgMTMzICA3MyAgMzEgMTM1ICAxNSAKMjA1IDIwNSAxMjIgMjEyIDIxMyAgMzMgMjE3IDE1MCAxNzMgMTcxICA5NSAxOTUgIDg5IDE1MSAxNTAgMjI0IA==";
}

module.exports = {
    getSecret : function () {
        return secret;
    }
}