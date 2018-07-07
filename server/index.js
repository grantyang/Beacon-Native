var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

