// server.js
// where your node app starts

// init project
const CommentCounts = require('comment-counts');
var express = require('express');
var app = express();


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/bugs", function (request, response) {
  response.send(buglist);
});

// Simple in-memory store for now
var buglist = {bugs: [], message: 'Still counting comments, will refresh…'};

function getCounts() {
  var commentCounts = new CommentCounts();
  commentCounts.count()
  .then(result => { buglist = result; });
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// update counts and get them once an hour
getCounts();
setInterval(getCounts, 1000*60*60);