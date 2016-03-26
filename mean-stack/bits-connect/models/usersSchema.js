var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username: String,
    bitsid: String,
    password: String,
    isprivate: Boolean,
    isverified: Boolean,
    note: String,
    appdata : { type : Array , "default" : [] },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', schema);
