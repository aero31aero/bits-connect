var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var supernodesSchema = require('../models/supernodesSchema.js');

/* GET /supernodes */
router.get('/', function (req, res) {
    supernodesSchema.find(function (err, supernodes) {
        if (err) return next(err);
        res.json(supernodes);
    });
});

/* POST /supernodes */
router.post('/', function (req, res, next) {
    console.log(req.body)
    if (!req.headers.authorization) {
        res.json({
            error: 'No credentials sent!'
        })
    } else {
        var encoded = req.headers.authorization.split(' ')[1];
        var decoded = new Buffer(encoded, 'base64').toString('utf8');
        console.log(encoded);
        console.log(decoded);
    }
    supernodesSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /supernodes/id */
router.get('/:id', function (req, res, next) {
    supernodesSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /supernodes/:id */
router.put('/:id', function (req, res, next) {
    supernodesSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /supernodes/:id */
router.delete('/:id', function (req, res, next) {
    supernodesSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
/* GET /supernodes/username/:username/password/:password */
router.get('/:id', function (req, res, next) {
    supernodesSchema.find({
        "username": req.params.username
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

    var cursor = supernodesSchema.find({
        "username": req.params.username,
        "password": req.params.password
    });
    cursor.each(function (err, post) {
        if (doc != null) {
            res.json(post)
        }
    });
});


module.exports = router;
