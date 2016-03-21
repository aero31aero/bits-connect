var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    nodename: String,
    deviceid: String,
    ipaddress: string,
    updated_at: { type: Date, default: Date.now },
    isactive: Boolean,
    
});

module.exports = mongoose.model('supernodes', usersSchema);