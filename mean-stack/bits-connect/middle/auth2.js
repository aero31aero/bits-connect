var mongoose = require('mongoose');
var appsSchema = require('../models/appsSchema.js');

var isAuthenticated = function (req, res, next) {
    if (!req.headers.authorization) {
        res.json({
            error: 'No credentials sent!'
        })
    } else {
        var encoded = req.headers.authorization.split(' ')[1];
        var decoded = new Buffer(encoded, 'base64').toString('utf8');
        console.log(encoded);
        var userid = decoded.split(':')[0];
        var appid = decoded.split(':')[1];
        checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i
        if(!checkForHexRegExp.test(appid)){
            res.json({
                    error: 'Invalid Authentication!'
                })
        }
        console.log(userid);
        console.log(appid);
        appsSchema.find({
            "userid": userid,
            "_id": appid
        }, function (err, result) {
            if (err) return next(err);
            if (result[0] != undefined) {
                console.log(result[0].permission);
                if (result[0].permission >= 2) {
                    return next();
                } else {
                    res.json({
                        error: 'Not Permitted!'
                    })
                }
            } else {
                res.json({
                    error: 'Not A Developer!'
                })
            }
        });

    }
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
}

module.exports = isAuthenticated;