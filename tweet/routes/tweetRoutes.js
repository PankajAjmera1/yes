const express = require('express');
const router = express.Router();
const Tweet = require('../model/tweetModel.js');
const { isLoggedIn } = require('../middleware/middleware.js');


router.get('/tweet/new', (req, res) => {
    res.render('tweets/add');
});

// router.post('/tweet', isLoggedIn, async (req, res) => {
//     try {
//         await Tweet.create(req.body);
//         req.flash('success', 'Tweet created');
//         res.redirect('/tweet');
//     } catch (error) {
//         console.error(error);
//         req.flash('error', 'Failed to create tweet');
//         res.redirect('/tweet/new');
//     }
// });
router.post('/tweet', isLoggedIn, async (req, res) => {
    try {
        const newTweet = await Tweet.create(req.body);
        req.flash('success', 'Tweet created');
        res.redirect('/tweet');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to create tweet');
        res.redirect('/tweet/new');
    }
});


router.get('/tweet', async (req, res) => {
    try {
        const allTweets = await Tweet.find({});
        res.render('tweets/home', { allTweets });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to retrieve tweets');
        res.redirect('/');
    }
});

router.get('/tweet/:id', isLoggedIn, async (req, res) => {
    try {
        const id = req.params.id;
        const singleTweet = await Tweet.findById(id);
        res.render('tweets/singleTweet', { tweet: singleTweet });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to retrieve tweet details.');
        res.redirect('/tweet');
    }
});

router.get('/tweet/:id/edit', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const singleTweet = await Tweet.findById(id);
        res.render('tweets/edit', { tweet: singleTweet });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to retrieve tweet for editing.');
        res.redirect('/tweet');
    }
});

router.patch('/tweet/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const { tweetContent } = req.body;
        await Tweet.findByIdAndUpdate(id, { tweetContent });
        req.flash('success', 'Tweet updated successfully');
        res.redirect(`/tweet/${id}`);
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to update tweet');
        res.redirect('/tweet');
    }
});

router.delete('/tweet/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        await Tweet.findByIdAndDelete(id);
        req.flash('error', 'Tweet deleted successfully');
        res.redirect('/tweet');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to delete tweet');
        res.redirect('/tweet');
    }
});

module.exports = router;
