var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    deviceid: String,
    ipaddress: String,
    userid: String,
    isactive: Boolean,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('iplist', usersSchema);