var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    appname: String,
    userid: String,
    description: String,
    isactive: Boolean,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('apps', usersSchema);