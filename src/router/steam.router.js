import express from 'express';
import SteamAPI from 'steamapi';
import 'dotenv/config';

import  ensureAuthenticated from '../auth';

const router = express.Router();
const steam = new SteamAPI(process.env.STEAM_KEY);

// The answer we get from Steam
router.get('/profile', async function(req,res) {
    if(req.query.steamid !== undefined) {
        steam.getUserSummary(req.query.steamid).then(profile => {
            res.send(profile);
        });
    } else {
        res.status(400).send({
            error: {
                code: 400,
                message: 'Query parameter \'steamid\' not provided'
            }
        });
    }
});

// The answer we get from Steam reduced to profilepicture, nickname and (resolved) friendslist
router.get('/profile/v1', async function(req, res) {
    if(req.query.steamid === undefined) {
        res.status(400).send({
            error: {
                code: 400,
                message: 'Query parameter \'steamid\' not provided'
            }
        });
        return;
    }

    if(req.query.rslvfriends === undefined) {
        res.status(400).send({
            error: {
                code: 400,
                message: 'Query parameter \'rslvfriends\' not provided'
            }
        });
        return;
    }

    var profile = {};
    await steam.getUserSummary(req.query.steamid).then(summary => {
        profile.profilepicture = summary.avatar.large;
        profile.nickname = summary.nickname;
    });
    
    var friendslist = [];
    await steam.getUserFriends(req.query.steamid).then(friends => {
        friendslist = friends;
    });
    if(req.query.rslvfriends === 'true') {
        for(var i = 0; i < friendslist.length; i++) {
            await steam.getUserSummary(friendslist[i].steamID).then(summary => {
                friendslist[i] = {
                    profilepicture: summary.avatar.large,
                    nickname: summary.nickname
                };
            });
        }
    }
    profile.friends = friendslist;
    res.send(profile);
});

// The answer we get from Steam reduced to profilepicture and nickname
router.get('/profile/v2', async function(req, res) {
    if(req.query.steamid === undefined) {
        res.status(400).send({
            error: {
                code: 400,
                message: 'Query parameter \'steamid\' not provided'
            }
        });
        return;
    }

    var profile = {};
    await steam.getUserSummary(req.query.steamid).then(summary => {
        profile.profilepicture = summary.avatar.large;
        profile.nickname = summary.nickname;
    });
    
    res.send(profile);
});

// The friends of user with steamid, resolved to the format used in '/profile/v2'
router.get('/rslvfriends', async function(req, res) {
    if(req.query.steamid === undefined) {
        res.status(400).send({
            error: {
                code: 400,
                message: 'Query parameter \'steamid\' not provided'
            }
        });
        return;
    }
    
    var friendslist = [];
    await steam.getUserFriends(req.query.steamid).then(friends => {
        friendslist = friends;
    });
    for(var i = 0; i < friendslist.length; i++) {
        await steam.getUserSummary(friendslist[i].steamID).then(summary => {
            friendslist[i] = {
                profilepicture: summary.avatar.large,
                nickname: summary.nickname
            };
        });
    }
    res.send({friends: friendslist});
});

// Only the profilepicture from the user with steamid
router.get('/profilepicture', async function(req, res) {
    if(req.query.steamid !== undefined) {
        steam.getUserSummary(req.query.steamid).then(profile => {
            res.send({ profilepicture: profile.avatar.large });
        });
    } else {
        res.status(400).send({
            error: {
                code: 400,
                message: 'Query parameter \'steamid\' not provided'
            }
        });
    }
});

// Only the nickname from the user with steamid
router.get('/nickaname', async function(req, res) {
    if(req.query.steamid !== undefined) {
        steam.getUserSummary(req.query.steamid).then(profile => {
            res.send({ nickname: profile.nickname });
        });
    } else {
        res.status(400).send({
            error: {
                code: 400,
                message: 'Query parameter \'steamid\' not provided'
            }
        });
    }
});

// Only the unresolved friendslist of the user with steamid
router.get('/friendslist', async function(req, res) {
    if(req.query.steamid !== undefined) {
        steam.getUserFriends(req.query.steamid).then(friends => {
            res.send(friends);
        });
    } else {
        res.status(400).send({
            error: {
                code: 400,
                message: 'Query parameter \'steamid\' not provided'
            }
        });
    }
});

module.exports = router;
