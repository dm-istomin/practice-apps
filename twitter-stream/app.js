/** @jsx React.DOM */

var React = require('react');
var ReactDOM = require('react-dom');
var TweetsApp = require('./components/TweetsApp.react');

// Get initial state that was passed from server side
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

// Render the components, picking up where react left off on the server
ReactDOM.render(
    <TweetsApp tweets={initialState}/>,
    document.getElementById('react-app')
);
