var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var db = require('../database');
require('dotenv').config();

var app = express();
var port = 1337;

app.use(express.static(__dirname + '/../client/dist'));

// app.get('/searchTerms', function (req, res) {
//   db.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.get('/fsquare/explore', function(req, res) {
  console.log('SERVER GET REQUEST');
  let updated_qs = Object.assign(
    {},
    {
      client_secret: process.env.FSQUARE_SECRET,
      client_id: process.env.FSQUARE_ID,
      v: '20170801'
    },
    req.query
  );
  request(
    {
      url: 'https://api.foursquare.com/v2/search/recommendations',
      qs: updated_qs
    },
    (err, response, body) => {
      if (err) {
        res.send(err);
      }
      res.json(JSON.parse(body));
    }
  );
});

app.listen(port, function() {
  console.log('Server started on: ' + port);
});
