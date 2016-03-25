var express = require('express');
var router = express.Router();

var auth1 = require('../middle/auth1');
var auth2 = require('../middle/auth2');

var mongoose = require('mongoose');
var appsSchema = require('../models/appsSchema.js');

/* GET /apps */
router.get('/', auth2, function (req, res) {
    appsSchema.find(function (err, apps) {
        if (err) return next(err);
        res.json(apps);
    });
});

/* POST /apps */
router.post('/', auth2, function (req, res, next) {
    console.log(req.body)
    appsSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /apps/id */
router.get('/:id', auth1, function (req, res, next) {
    appsSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /apps/:id */
router.put('/:id', auth2, function (req, res, next) {
    appsSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /apps/:id */
router.delete('/:id', auth2, function (req, res, next) {
    appsSchema.findByIdAndUpdate(req.params.id, {"isactive":false}, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});



module.exports = router;
