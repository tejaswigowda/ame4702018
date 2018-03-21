var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

var Client = require('node-rest-client').Client;

var MS = require("mongoskin");
var db = MS.db("mongodb://localhost:27017/ame470")


app.get("/", function (req, res) {
    res.redirect("index.html");
});

app.get("/getFeedData", function (req, res) {
  var url = req.query.url;
  var client = new Client();
  client.get(url, function (data, response) {
    res.end(JSON.stringify(data)); // send response body
  });
});


app.get("/getAllFeeds", function (req, res) {
  db.collection('feeds').find().toArray(function(err, items) {
    res.send(items);
  });
});

app.get("/addFeed", function (req, res) {
  var data = req.query;
  db.collection("feeds").insert(data, function(err, result){
    res.send("1");
  });
});



app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
