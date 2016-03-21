var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    devicename: String,
    macaddress: String,
    userid: String,
    type: String,
    isprivate: Boolean,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('devices', usersSchema);