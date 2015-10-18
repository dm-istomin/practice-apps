/** @jsx React.DOM */

var React = require('react');

module.exports = Tweet = React.createClass({
    render: function() {
        var tweet = this.props.tweet;
        return (
            <li className={"tweet" + (tweet.active ? ' active ' : '')}>
                <img src={tweet.avatar} className="avatar"></img>
                <blockquote>
                    <cite>
                        <a href={"https://www.twitter.com/" + tweet.screenname}>{tweet.author}</a>
                        <span className="screen-name">@{tweet.screenname}</span>
                    </cite>
                    <span className="content">{tweet.body}</span>
                </blockquote>
            </li>
        );
    }
});
