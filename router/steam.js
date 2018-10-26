var config = require('./../config.json');
var express = require('express');
var router = express.Router();

var SteamAPI = require('steamapi');
var steam = new SteamAPI(config.SteamWebAPIKey);

router.get('/profilepicture', function(req, res) {
    steam.getUserSummary(req.query.steamid).then(profile => {
        res.send({ profilepicture: profile.avatar.large });
    });
});

router.get('/profilename', function(req, res) {
    steam.getUserSummary(req.query.steamid).then(profile => {
        res.send({ profilename: profile.nickname });
    });
});

router.get('/friendslist', function(req, res) {
    steam.getUserFriends(req.query.steamid).then(friends => {
        res.send(friends);
    });
});

module.exports = router;