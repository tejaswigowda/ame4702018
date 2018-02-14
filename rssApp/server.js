var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

var Client = require('node-rest-client').Client;


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

app.get("/eval", function (req, res) {
  var eq = req.query.eq;

  var r = eq + " = " + eval(eq) + "\n";
   res.writeHead(200, {'Content-Type': 'text/plain'}); // send response header
   res.end(r); // send response body
});



app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
