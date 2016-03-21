var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    deviceid: String,
    ipaddress: String,
    userid: String,
    isactive: Boolean,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Iplist', schema);
