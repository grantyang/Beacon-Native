var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var db = require('../database');
require('dotenv').config();

var app = express();
var port = 1337;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/saved-interests', function(req, res) {
  db.upsertUser(req.body.data)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.sendStatus(500).send(err);
    });
});

app.get('/saved-interests/:user', function(req, res) {
  const user = req.params.user;
  db.getUserInterests(user)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.sendStatus(500).send(err);
    });
});

app.get('/fsquare/explore', function(req, res) {
  let updatedQueryObj = Object.assign(
    {},
    {
      client_secret: process.env.FSQUARE_SECRET,
      client_id: process.env.FSQUARE_ID,
      v: '20170801'
    },
    req.query
  );
  axios
    .get('https://api.foursquare.com/v2/search/recommendations', {
      params: updatedQueryObj
    })
    .then(APIresponse => {
      res.json(APIresponse.data.response.group.results);
    })
    .catch(err => {
      res.sendStatus(500).send(err);
    });
});

app.listen(port, function() {
  console.log('Server started on: ' + port);
});
