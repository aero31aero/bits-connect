var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var devicesSchema = require('../models/devicesSchema.js');

/* GET /devices */
router.get('/', function (req, res) {
    devicesSchema.find(function (err, devices) {
        if (err) return next(err);
        res.json(devices);
    });
});

/* POST /devices */
router.post('/', function (req, res, next) {
    console.log(req.body)
    
    devicesSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /devices/id */
router.get('/:id', function (req, res, next) {
    devicesSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /devices/:id */
router.put('/:id', function (req, res, next) {
    devicesSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /devices/:id */
router.delete('/:id', function (req, res, next) {
    devicesSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
