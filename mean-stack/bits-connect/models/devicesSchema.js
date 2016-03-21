var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    devicename: String,
    macaddress: String,
    userid: String,
    type: String,
    isprivate: Boolean,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Devices', schema);
