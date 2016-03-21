var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var devicesSchema = require('../models/devicesSchema.js');

function isValidMac(mac) {
  var a = mac.split(':');
  if (a.length !== 6) {
    return false;
  }
  for (var i=0; i<6; i++) {
    var s = "0x"+a[i];
    if (s>>0 === 0 || s.length != 4) {
      return false;
    }
  }
  return true;
}


/* GET /devices */
router.get('/', function (req, res) {
    devicesSchema.find(function (err, devices) {
        if (err) return next(err);
        res.json(devices);
    });
});

/* GET /devices/users/:userid */
router.get('/users/:userid', function (req, res) {
    devicesSchema.find({"userid": req.params.userid},function (err, devices) {
        if (err) return next(err);
        res.json(devices);
    });
});

/* POST /devices */
router.post('/', function (req, res, next) {
    console.log(req.body)
    var re = /^([0-9A-F]a-f{2}[:]){5}([0-9A-Fa-f]{2})$/;
    //var re = /^[0-9]{2}[:][0-9]{2}[:][0-9]{2}[:][0-9]{2}[:][0-9]{2}[:][0-9]{2}/g;
    if (isValidMac(req.body.macaddress)) {
        devicesSchema.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    }
    else{
        res.send("{status:fail}");
    }
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
