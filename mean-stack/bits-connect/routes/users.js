var express = require('express');
var router = express.Router();

var auth1 = require('../middle/auth1');
var auth2 = require('../middle/auth2');

var mongoose = require('mongoose');
var usersSchema = require('../models/usersSchema.js');

/* GET /users */
router.get('/', auth1, function (req, res) {
    
    
    usersSchema.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* POST /users */
router.post('/', auth2, function (req, res, next) {
    console.log(req.body)
    
    usersSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
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
    usersSchema.count(req.body, function (err, usercount) {
        if (err) res.send("fail");
        console.log(usercount);
        if (usercount !=1) {
            res.json({
                    error: 'Invalid Authentication!'
                })
        }
        if(usercount==1){
            usersSchema.find(req.body, {"password":false}, function (err, user) {
                res.json(user);
            });
        }
    });

});


module.exports = router;

