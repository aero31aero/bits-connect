var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nodename: String,
    deviceid: String,
    ipaddress: string,
    updated_at: { type: Date, default: Date.now },
    isactive: Boolean,
    
});

module.exports = mongoose.model('Supernodes', schema);
