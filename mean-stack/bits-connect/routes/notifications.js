var express = require('express');
var router = express.Router();

var auth1 = require('../middle/auth1');
var auth2 = require('../middle/auth2');

var mongoose = require('mongoose');
var notificationsSchema = require('../models/notificationsSchema.js');

/* GET /notifications/ */
router.get('/:id', auth1 ,function (req, res) {
    notificationsSchema.find(function (err, notif) {
        if (err) return next(err);
        res.json(notif);
    });
});

/* POST /notifications/ */
router.post('/:id', auth1, function (req, res, next) {
    console.log(req.body)
    notificationsSchema.create(req.body, function (err, notif) {
        if (err) return next(err);
        res.json(notif);
    });
});