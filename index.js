var config = require('./config.json');
var express = require('express');

var steamrouter = require('./router/steam.js');

var SteamAPI = require('steamapi');
var steam = new SteamAPI(config.SteamWebAPIKey);

var app = express();

app.use('/steam', steamrouter);

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(config.Port, function() {
    console.log('Server listening on port ' + config.Port);
});