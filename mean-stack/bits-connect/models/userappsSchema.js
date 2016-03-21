var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    userid: String,
    appid: String,
    isactive: Boolean,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('userappss', usersSchema);