var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 1234;

app.get("/", function (req, res) {
    res.redirect("index.html");
});

var callback = function (req, res) { // req -> request object; res -> response object
  var eq = req.url.replace("/","");;

  if(eq.indexOf("favicon") >=0 ) return;

  var r = eq + " = " + eval(eq) + "\n";
   res.writeHead(200, {'Content-Type': 'text/plain'}); // send response header
   res.end(r); // send response body
}

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
