// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var requestHeaderSvr = require('./request_header_ms.js');
var parseClientLang = require('./lang_code.js')
var useragent = require('express-useragent');

app.use(useragent.express());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api/lang", function (request, response) {
  var lang = request.acceptsLanguages();
  var source = request.useragent.source;
  var ip = request.headers['x-forwarded-for'].split(',')[0];
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end( 
      parseClientLang(lang[0])
  );
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
