var express = require('express');
var router = express.Router();

var auth1 = require('../middle/auth1');
var auth2 = require('../middle/auth2');

var mongoose = require('mongoose');
var usersSchema = require('../models/usersSchema.js');

var crypto = require('crypto');

/* GET /users */
router.get('/', auth1, function (req, res) {


    usersSchema.find({}, {
                "password": false
            },function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* POST /users */
router.post('/', auth2, function (req, res, next) {
    console.log(req.body)
    var userobj=req.body;
    userobj.password=crypto.createHash('md5').update(req.body.password).digest("hex");
    userobj.password=crypto.createHash('md5').update(req.body.password+userobj.password).digest("hex");
    usersSchema.create(userobj, function (err, post) {
        if (err) return next(err);
        res.json(post);
        var confirmurl="172.16.121.10:3000/users/verification/"+post._id;
        var api_key = 'key-0518a24980eb8e0cdcd18549cf57620a';
        var domain = 'sandboxaa5129032958444486c928220840d7eb.mailgun.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
        var data = {
        from: 'Nischay Pro <f2015606@hyderabad.bits-pilani.ac.in>',
        to:  userobj.bitsid + '@hyderabad.bits-pilani.ac.in',
        subject: 'Please activate your Bits Connect Account',
        html: 'Thank you for using our services. To finish setting up your account you need to confirm your email.<br><a href="'+confirmurl+'">Click Here To Confirm Your Email.</a><br>Alternatively, open this link: '+confirmurl
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
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

/* DELETE /users/:id */
router.delete('/:id', auth2, function (req, res, next) {
    usersSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* POST /users/search/authenticate/ */
router.post('/search/authenticate', auth1, function (req, res, next) {
    var userobj=req.body;
    userobj.password=crypto.createHash('md5').update(req.body.password).digest("hex");
    userobj.password=crypto.createHash('md5').update(req.body.password+userobj.password).digest("hex");
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
    usersSchema.findByIdAndUpdate(req.params.id, {"isverified":true}, function (err, post) {
        if (err) return next(err);
        res.render('index', { title: 'Bits Connect' });
    });
});
module.exports = router;