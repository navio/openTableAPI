var request = require('request');
var cheerio = require('cheerio');

module.exports = function(url, fn) {

  url = 'http://www.opentable.com/s/?datetime=10/18/2014%207:30%20PM&covers=2&metroid=4&regionids=5&showmap=false&popularityalgorithm=NameSearches';


  request(url, function(error, response, html){
        if(!error && response.statusCode == 200 ){ // No Errors

            var $ = cheerio.load(html);
            var table = [];

            //scrape;
            $('#search_results_table.table tr').each(function(i, element){

              var name          = $(element).find('.rest-name').text();
              var hood_cuisine  = $(element).find('.rest-content div').text().split(" | ");
              var reviews       = $(element).find('.reviews').text().trim();
              var link          = $(element).find('.rest-content a').attr('href');
              var times_raw     = $(element).find('.timeslots li span.time');
              var times = [];

              times_raw.each(function(i){
                  times.push($(this).text().trim());
              });

              if(name === '') return;

              table.push({
                           name: name,
                           neighborhood: hood_cuisine[0],
                           cuisine: hood_cuisine[1],
                           reviews: reviews,
                           link: link,
                           times: times
                           });

            });
            console.log(table)
            //executefn
            fn();
    }
  });

}
