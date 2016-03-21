var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    key: String,
    appname: String,
    isactive: Boolean,
    updated_at: { type: Date, default: Date.now },
    permission: String;
});

module.exports = mongoose.model('apikeys', usersSchema);