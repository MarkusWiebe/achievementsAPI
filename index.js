var config = require('./config.json');
var express = require('express');

var SteamAPI = require('steamapi');
var steam = new SteamAPI(config.SteamWebAPIKey)

var app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(5000, function() {
    console.log('Server listening on port 5000');
});