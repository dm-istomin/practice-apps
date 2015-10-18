var JSX       = require('node-jsx').install(),
    React     = require('react'),
    TweetsApp = require('./components/TweetsApp.react'),
    Tweet     = require('./models/tweet');

module.exports = {
    index: function(req, res) {
        // Call static method to get Tweets in the db
        Tweet.getTweets(0, 0, function(tweets, pages) {
            // Render React to a string, passing in fetched tweets
            var markup = React.renderComponentToString(
                TweetsApp({tweets: tweets})
            );

            res.render('home', {
                markup: markup,
                state: JSON.stringify(tweets)
            })
        });
    },

    page: function(req, res) {
        Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
            res.send(tweets); // Render as JSON
        })
    }
}
