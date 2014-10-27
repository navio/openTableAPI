var request = require('request');
var cheerio = require('cheerio');
var async   = require('async');

module.exports = function(url,cb) {

  cb(schemaReader(schema));

  var schema = {
    request : {
      url: 'url.com/ass/asa',
      method: 'get',
      data : {
        container:{
            selector: '#search_results_table.table tr',
            multiple: true,
            children: {
                name: '.rest-name',
                hood_cuisine: '.rest-content div',
                reviews: '.reviews',
                link: { selector: '.rest-content a', attr: 'href' },
                times: { selector: '.timeslots li span.time', multiple: true }
            }
        }
      }
    }
  };

  function schemaReader(elements){

    for( var element in elements){
      if (!requestValidity(element)) return false;
      request(element.url,
              function(error, response, html){
                              parser(html,element.data);
              });
    }

    function requestValidity(item){
      if(!item.url) return false;
      if(!item.data) return false;
    }

    function parser(data,schema){
      var $ = cheerio.load(data);  // check to not create a new object everytime.

      return schema.map(function(element){

        var toSelect = element.selector ? element.selector: element; // simple leaf or not;
        var el = $(toSelect);

        return el.map(function(i,element){
          var finalValue = '';

          if(element.attr){ //return attribute value
            finalValue = el.attr(element.attr);
          }else{
            finalValue = el.text();
          }

          if(element.children){
            return ['value': finalValue , 'children': parser(el,element.children) ]; // return object
          }

          return finalValue;
        });
      }
    }

  }

  // function scrape($){
  //
  //       var table = [];
  //       $('#search_results_table.table tr').each(function(i, element){
  //
  //         var name          = $(element).find('.rest-name').text();
  //         var hood_cuisine  = $(element).find('.rest-content div').text().split(" | ");
  //         var reviews       = $(element).find('.reviews').text().trim();
  //         var link          = $(element).find('.rest-content a').attr('href');
  //         var times_raw     = $(element).find('.timeslots li span.time');
  //         var times         = [];
  //
  //         if(name === '' ) return;
  //
  //         times_raw.each(function(i){
  //              times.push( $(this).text().trim().replace(" PM", "") );
  //         });
  //
  //         var windows = windowCalculator(times);
  //
  //         table.push({
  //                      name: name,
  //                      neighborhood: hood_cuisine[0],
  //                      cuisine: hood_cuisine[1],
  //                      reviews: reviews,
  //                      times: times,
  //                      windows: windowCalculator(times),
  //                      link: link,
  //                      });
  //
  //       });
  //
  //       return table;
  // }

  // Assume the start point is   4:59pm
  // Assume the latest point is 10:01pm
  // Exist in here to not create depedency to utils
//   function windowCalculator(times){
//     if(times.length == 0) return [302];
//     var start = '4:59', ends = '10:01', prev;
//     var windows = []; var flag = false;
//
//     prev = start;
//
//     for(var i = 0; i < times.length; i++){
//
//
//       if (times[i] == ''){
//           flag = true;
//       }else{
//           if(flag){  // when window is closed.
//               windows.push(minuteDistance(prev,times[i]));
//               flag = false;
//           }
//           prev = times[i];
//       }
//
//     }
//
//    if(flag){ // final case.
//       windows.push(minuteDistance(prev,ends));
//       flag = false;
//    }
//
//    return windows;
//
//     function minuteDistance(start,end){
//       var timeStart  = new Date("06/18/1989 " + start);
//       var timeEnd    = new Date("06/18/1989 " + end);
//
//       return Math.round( (timeEnd - timeStart) / 60000);
//
//     }
//
//
//   }
//
 }
