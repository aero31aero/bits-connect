var express = require('express');
var router = express.Router();

var auth1 = require('../middle/auth1');
var auth2 = require('../middle/auth2');

var mongoose = require('mongoose');
var usersSchema = require('../models/usersSchema.js');
var ObjectID = require('mongodb').ObjectID;
var crypto = require('crypto');

/* GET /users */
router.get('/', auth1, function (req, res) {


    usersSchema.find({}, {
        "password": false
    }, function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* POST /users */
router.post('/', auth2, function (req, res, next) {
    console.log(req.body)
    var userobj = req.body;
    var useruser = {
        username: req.body.username
    };
    var userbitsid = {
        bitsid: req.body.bitsid
    };
    userobj.password = crypto.createHash('md5').update(req.body.password).digest("hex");
    userobj.password = crypto.createHash('md5').update(req.body.password + userobj.password).digest("hex");
    usersSchema.count({
        $or: [useruser, userbitsid]
    }, function (err, usercount) {
        if (err) res.send("fail");
        console.log(usercount);
        if (usercount >= 1) {
            res.json({
                error: 'User Exists!'
            })
        }
        if (usercount == 0) {
            usersSchema.create(userobj, function (err, post) {
                if (err) return next(err);
                res.json(post);
                var api_key = 'key-0518a24980eb8e0cdcd18549cf57620a';
                var domain = 'sandboxaa5129032958444486c928220840d7eb.mailgun.org';
                var mailgun = require('mailgun-js')({
                    apiKey: api_key,
                    domain: domain
                });
                var data = {
                    from: 'Nischay Pro <f2015606@hyderabad.bits-pilani.ac.in>',
                    to: userobj.bitsid + '@hyderabad.bits-pilani.ac.in',
                    subject: 'Please Confirm Your Bits Connect Account',
                    html: '<p>Dear ' + post.username + ', thank you for using our services. To finish setting up your account you need to confirm your identity.</p><p>Paste this key code in your dashboard after login:</p><h2> ' + post._id + '</h2>'
                }
                mailgun.messages().send(data, function (error, body) {
                    console.log(body);
                });
            });
        }
    });


});

/* GET /users/id */
router.get('/:id', auth1, function (req, res, next) {
    usersSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /users/:id */
router.put('/:id', auth2, function (req, res, next) {
    usersSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /users/:id/appdata */
router.put('/:id/appdata', auth1, function (req, res, next) {
    if (req.body.hasOwnProperty('field') && req.body.hasOwnProperty('data')) {
        var encoded = req.headers.authorization.split(' ')[1];
        var decoded = new Buffer(encoded, 'base64').toString('utf8');
        console.log(encoded);
        var appid = decoded.split(':')[1];
        var appdataobj = {
            $addToSet: {
                "appdata": {
                    'appid': appid
                }
            }
        }
        var appcounter;
        var userfilter = {
            "_id": ObjectID(req.params.id),
            "appdata.appid": appid
        }

        usersSchema.count(userfilter, function (err, count) {
            if (err) return next(err);
            if (count == 0) {
                usersSchema.findByIdAndUpdate(req.params.id, appdataobj, function (err, post) {
                    if (err) return next(err);
                });
            }
        });


        //    usersSchema.findById(req.params.id, function (err, post) {
        //        if (err) return next(err);
        //        for(var counter=0;counter<post.appdata.length;counter++){
        //            if(post.appdata[counter].appid==appid){
        //                appcounter=counter;
        //            }
        //        };
        //    });
        var field = "appdata.$." + req.body.field;
        appdataobj = {};
        var set = {};
        set[field] = req.body.data;
        appdataobj["$set"] = set;
        usersSchema.update(userfilter, appdataobj, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }
    else{
        res.json({
            error: 'Could not find field and data attrs.'
        })
    }

});

/* DELETE /users/:id */
router.delete('/:id', auth2, function (req, res, next) {
    usersSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* POST /users/search/authenticate/ */
router.post('/search/authenticate', auth1, function (req, res, next) {
    var userobj = req.body;
    userobj.password = crypto.createHash('md5').update(req.body.password).digest("hex");
    userobj.password = crypto.createHash('md5').update(req.body.password + userobj.password).digest("hex");
    usersSchema.count(userobj, function (err, usercount) {
        if (err) res.send("fail");
        console.log(usercount);
        if (usercount != 1) {
            res.json({
                error: 'Invalid Authentication!'
            })
        }
        if (usercount == 1) {
            usersSchema.find(req.body, {
                "password": false
            }, function (err, user) {
                res.json(user);
            });
        }
    });
});

/* GET /users/verification/id */
router.get('/verification/:id', function (req, res, next) {
    usersSchema.findByIdAndUpdate(req.params.id, {
        "isverified": true
    }, function (err, post) {
        if (err) return next(err);
        res.render('index', {
            title: 'Bits Connect'
        });
    });
});
module.exports = router;
