var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userid: String,
    appid: String,
    isactive: Boolean,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Userapps', schema);
