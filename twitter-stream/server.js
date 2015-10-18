// Dependencies
var express       = require('express'),
    exphbs        = require('express-handlebars'),
    http          = require('http'),
    mongoose      = require('mongoose'),
    twitter       = require('ntwitter'),
    routes        = require('./routes'),
    config        = require('./config'),
    streamHandler = require('./utils/streamHandler');

// Create express instance, set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses - I think this prevents stale data? Not sure.
app.disable('etag');

// Connect to the Mongo database
mongoose.connect('mongodb://localhost/twitter-stream');

// Create new nTwitter instance
var twit = new twitter(config.twitter);

// Routes
app.get('/', routes.index);
app.get('/page/:page/:skip', routes.page);

// Use 'public/' as the static content directory
app.use('/', express.static(__dirname + '/public/'));

// Start server
var server = http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);
});

// Initialize Socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords

twit.stream('statuses/filter', {track: '#hello, #world'}, function(stream) {
    streamHandler(stream, io);
});
