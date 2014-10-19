var express = require('express');
var app     = express();
var scraper = require('./scraper.js');

app.get('/scrape/:cover', function(req, res){

   cover = req.params.cover || 2; // OpenTable default.
   datetime = req.param.datetime || '2014-10-18%2021:30'; // current time from requester.
   metroid = req.param.metroid || 13; //can be replaced to requester location

  //  var url  = 'http://www.opentable.com/s/? \
  //                datetime=' + datetime + ' \
  //                &covers=' + cover + ' \
  //                &metroid='+ metroid +' \
  //                &showmap=false' ;

  var url = 'http://www.opentable.com/s/?datetime=10/18/2014%207:00%20PM&covers=2&metroid=4&regionids=5&showmap=false&popularityalgorithm=NameSearches&tests=EnableMapview,ShowPopularitySortOption,srs,customfilters&sort=Popularity&excludefields=Description'; 
   scraper(url, function(err,table){ res.json(table); });

})

app.listen('8081')

function dateFomat(){
  var d = new Date();
  return d.getMonth()+'/'+d.getDate()+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
}

function urlGenerator(){

}



console.log('Port 8081');
exports = module.exports = app;
