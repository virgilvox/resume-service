var mongojs = require('mongojs')
var express = require('express')
var config  = require('./config.json')
var app = express()
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var db = mongojs(config.connectionString);
var mycollection = db.collection('users');

var port = process.env.PORT || 8070 ;

app.post('/create', function (req, res) {
  var body = req.body;
  createUser(body, res);
})

app.post('/find', function (req, res) {
  var body = req.body;
  findUser(body.user, res);

});

app.listen(port)

var createUser = function(body,res){

  mycollection.findOne({username: body.username}, function(err, doc) {
    if(doc == null){
      var user = {
        username: body.username,
        password: body.password,
        email: body.email,
        resume: body.resume
      };
      mycollection.insert(user, function(err,value){
        return res.status(200).send("created!");
      });
    } else if(doc != null){
        return res.status(200).send("exists");
    }
  });

};

var findUser = function(user, res){

  mycollection.findOne({username: user}, function(err, doc) {
    return res.status(200).send(doc);
  });
};
