var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(gzippo.staticGzip("" + __dirname + "/client"));
app.use(express.static(__dirname + '/client'));

app.get('/client', function(req, res) {
  res.render('index.html');
});

app.listen((process.env.PORT || 5000), function(){
  console.log('Notely app is running on port 5000');
});
