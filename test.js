var mongojs = require('mongojs')
var express = require('express')
var app = express()

var db = mongojs('mongodb://boss:blackbird@ds061984.mongolab.com:61984/resgen');
var mycollection = db.collection('users');


  mycollection.findOne({username: "dog"}, function(err, doc) {
    console.log(err);
    console.log('found: ', doc);
  });
