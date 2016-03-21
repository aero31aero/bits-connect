var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var apikeysSchema = require('../models/apikeysSchema.js');

/* GET /apikeys */
router.get('/', function (req, res) {
    apikeysSchema.find(function (err, apikeys) {
        if (err) return next(err);
        res.json(apikeys);
    });
});

/* POST /apikeys */
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
    apikeysSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /apikeys/id */
router.get('/:id', function (req, res, next) {
    apikeysSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /apikeys/:id */
router.put('/:id', function (req, res, next) {
    apikeysSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /apikeys/:id */
router.delete('/:id', function (req, res, next) {
    apikeysSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
