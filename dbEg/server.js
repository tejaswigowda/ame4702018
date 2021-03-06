var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var MS = require("mongoskin");
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

var db = MS.db("mongodb://localhost:27017/ame470")


app.get("/", function (req, res) {
    res.redirect("index.html")
});

app.get("/getData", function (req, res) {
  db.collection('names').find().toArray(function(err, items) {
    res.send(items);
  });
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
