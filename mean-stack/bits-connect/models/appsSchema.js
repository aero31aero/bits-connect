var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    appname: String,
    userid: String,
    description: String,
    isactive: Boolean,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Apps', schema);
