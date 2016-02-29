var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var usersSchema = require('../models/usersSchema.js');

/* GET users listing. */
router.get('/', function(req, res) {
    usersSchema.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/', function(req, res, next) {
    console.log(req.body)
    if (!req.headers.authorization) {
        res.json({ error: 'No credentials sent!' })
    } 
    else {
        var encoded = req.headers.authorization.split(' ')[1];
        var decoded = new Buffer(encoded, 'base64').toString('utf8');
        console.log(encoded);
        console.log(decoded);
    }
    usersSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /users/id */
router.get('/:id', function(req, res, next) {
    usersSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
    usersSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
    usersSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;