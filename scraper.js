var request = require('request');
var cheerio = require('cheerio');

module.exports = function(url, fn) {

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
              var times         = [];

              times_raw.each(function(i){
                   times.push( $(this).text().trim().replace(" PM", "") );
              });

              var windows = windowCalculator(times);

              if(name === '' ) return;


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

            fn(null,table);

    // In case of an error with the page.
    }else{  fn(true,error); }

  });


  // Assume the start point is   4:59pm
  // Assume the latest point is 10:01pm
  function windowCalculator(times){
    var start = '4:59', ends = '10:01', prev;
    var windows = []; var flag = false;

    prev = start;

    for(var i = 0; i < times.length; i++){


      if (times[i] == ''){
          flag = true;
      }else{
          if(flag){  // when window is closed.
              windows.push({w:minuteDistance(prev,times[i]),p:prev ,t: times[i]});
              flag = false;
          }
          prev = times[i];
      }

    }

   if(flag){ // final case.
      windows.push({w:minuteDistance(prev,ends),p:prev ,t: ends});
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
