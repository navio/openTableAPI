var request = require('request');
var cheerio = require('cheerio');

module.exports = function(url,cb) {

    request(url, function(error, response, html){

        if(!error && response.statusCode == 200 ){ // No Errors

            var $ = cheerio.load(html);
                    cb(null,scrape($));

        }else{  cb(error,null) }

    });

  function scrape($){

        var table = [];
        $('#search_results_table.table tr').each(function(i, element){

          var name          = $(element).find('.rest-name').text();
          var hood_cuisine  = $(element).find('.rest-content div').text().split(" | ");
          var reviews       = $(element).find('.reviews').text().trim();
          var link          = $(element).find('.rest-content a').attr('href');
          var times_raw     = $(element).find('.timeslots li span.time');
          var times         = [];

          if(name === '' ) return;

          times_raw.each(function(i){
               times.push( $(this).text().trim().replace(" PM", "") );
          });

          var windows = windowCalculator(times);

          table.push({
                       name: name,
                       neighborhood: hood_cuisine[0],
                       cuisine: hood_cuisine[1],
                       reviews: reviews,
                       times: times,
                       windows: windowCalculator(times),
                       link: link,
                       });

        });

        return table;
  }

  // Assume the start point is   4:59pm
  // Assume the latest point is 10:01pm
  // Exist in here to not create depedency to utils
  function windowCalculator(times){
    if(times.length == 0) return [302];
    var start = '4:59', ends = '10:01', prev;
    var windows = []; var flag = false;

    prev = start;

    for(var i = 0; i < times.length; i++){


      if (times[i] == ''){
          flag = true;
      }else{
          if(flag){  // when window is closed.
              windows.push(minuteDistance(prev,times[i]));
              flag = false;
          }
          prev = times[i];
      }

    }

   if(flag){ // final case.
      windows.push(minuteDistance(prev,ends));
      flag = false;
   }

   return windows;

    function minuteDistance(start,end){
      var timeStart  = new Date("06/18/1989 " + start);
      var timeEnd    = new Date("06/18/1989 " + end);

      return Math.round( (timeEnd - timeStart) / 60000);

    }


  }

}
