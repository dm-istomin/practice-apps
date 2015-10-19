/** @jsx React.DOM */

var React           = require('react'),
    Tweets          = require('./Tweets.react.js'),
    Loader          = require('./Loader.react.js'),
    NotificationBar = require('./NotificationBar.react.js');

module.exports = TweetsApp = React.createClass({
    // render the component
    render: function() {
        return (
            <div className="tweets-app">
                <Tweets tweets={this.state.tweets}/>
                <Loader paging={this.state.paging}/>
                <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets}/>
            </div>
        )
    },

    getInitialState: function(props) {
        props = props || this.props;

        return {
            tweets: props.tweets,
            count: 0,
            page: 0,
            paging: false,
            skip: 0,
            done: false
        };
    },

    componentWillReceiveProps: function(newProps, oldProps) {
        this.setState(this.getInitialState(newProps));
    },

    componentDidMount: function() {
        var self   = this,
            socket = io.connect();

        socket.on('tweet', function(data) { self.addTweet(data); });
        window.addEventListener('scroll', this.checkWindowScroll); // for paging
    },

    addTweet: function(tweet) {
        var updated = this.state.tweets,
            count   = this.state.count + 1, // increment the unread count
            skip    = this.state.skip + 1;  // increment the skip count

        updated.unshift(tweet); // add tweet to beginning of the tweets array
        this.setState({tweets: updated, count: count, skip: skip}); // set app state
    },

    showNewTweets: function() {
        var updated = this.state.tweets;

        updated.forEach(function(tweet) { tweet.active = true; });
        this.setState({tweets: updated, count: 0}); // set app state (active tweets + reset unread)
    },

    checkWindowScroll: function() {
        // Get scroll position and window data
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            s = document.body.scrollTop,
            scrolled = (h + s) > document.body.offsetHeight;

        if (scrolled && !this.state.paging && !this.state.done) {
            this.setState({paging: true, page: this.state.page + 1});
            this.getPage(this.state.page);
        }
    },

    getPage: function(page) {
        var request = new XMLHttpRequest(), self = this;
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                self.loadPagedTweets(JSON.parse(request.responseText));
            } else {
                self.setState({paging: false, done: true});
            }
        };
        request.open('GET', 'page/' + page + '/' + this.state.skip, true);
        request.send();
    },

    loadPagedTweets: function(tweets) {
        var self = this;
        if (tweets.length > 0) {
            var updated = this.state.tweets;
            tweets.forEach(function(tweet) { updated.push(tweet); });
                self.setState({tweets: updated, paging: false});
        } else {
            this.setState({done: true, paging: false});
        }
    }

});
