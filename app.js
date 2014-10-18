var express = require('express');
var app     = express();
var sr = require(__dirname + '/scraper.js');

app.get('/scrape', function(req, res){

   var table = sr('http://', function(err,table){
    res.send('ok');
   } );

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
