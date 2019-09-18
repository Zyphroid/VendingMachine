//clientID 534621230183-c4u73b4h82a010i566c5mbihhnlc3j5o.apps.googleusercontent.com
//client secret mTkufgA229-IxPaNGp7hxKFI

if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}