var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');

module.exports = function(stream, io) {
    stream.on('data', function(data) {
        if (!data.user) { return; }

        var tweet = {
            twid: data['id'],
            active: false,
            author: data['user']['name'],
            avatar: data['user']['profile_image_url'],
            body: data['text'],
            date: data['created_at'],
            screenname: data['user']['screen_name']
        };

        var tweetEntry = new Tweet(tweet);

        tweetEntry.save(function(err) {
            if (!err) { io.emit('tweet', tweet); }
        });
    });

    stream.on('error', function(error) {
        console.log('Stream error: ' + error);
    });
};
