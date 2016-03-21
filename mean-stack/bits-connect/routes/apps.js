var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var appsSchema = require('../models/appsSchema.js');

/* GET /apps */
router.get('/', function (req, res) {
    appsSchema.find(function (err, apps) {
        if (err) return next(err);
        res.json(apps);
    });
});

/* POST /apps */
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
    appsSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /apps/id */
router.get('/:id', function (req, res, next) {
    appsSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /apps/:id */
router.put('/:id', function (req, res, next) {
    appsSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /apps/:id */
router.delete('/:id', function (req, res, next) {
    appsSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
/* GET /apps/username/:username/password/:password */
router.get('/:id', function (req, res, next) {
    appsSchema.find({
        "username": req.params.username
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

    var cursor = appsSchema.find({
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
