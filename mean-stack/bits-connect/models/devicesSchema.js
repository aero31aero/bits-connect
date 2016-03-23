var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    devicename: String,
    macaddress: String,
    userid: String,
    type: String,
    isprivate: Boolean,
    ipactive: Boolean,
    ipaddress: String,
    iptime: Date,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Devices', schema);
