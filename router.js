var router  = require('express').Router();
var util    = require('./util.js');
var scraper = require('./scraper.js');

module.exports = router;

router.get('/',function(req,res){
  res.sendfile(__dirname + '/index.html');
});


router.get('/json', function(req, res){  // Extra json link

   cover = req.params.cover || 2; // OpenTable default.
   datetime = req.params.datetime || '10/18/2014 7:00%20PM'; // current time from requester.
   metroid = req.param.metroid || 4; //can be replaced to requester location

   scraper(util.urlGenerator(cover,datetime,metroid),
           function(err,table){
              if(err) res.send('err'); //probably insecure but for dev purpose left.
              res.json(table);
            }
          );
});


router.get('/csv', function(req, res){

   cover = req.params.cover || 2; // OpenTable default.
   datetime = req.params.datetime || '10/18/2014 7:00%20PM'; // current time from requester.
   metroid = req.param.metroid || 4; //can be replaced to requester location

   var converter = require('json-2-csv');

   scraper(util.urlGenerator(cover,datetime,metroid),
           function(err,table){

              var toConvert = table.map(function(item){ // Cleaning view to adjust requirements.
                return {                                // Given the time for the project, left here. toRefactor

                          Name:item.name,
                          Neighborhood:item.neighborhood,
                          Cuisine:item.cuisine,
                          Reviews: item.reviews,
                          Window: item.windows.join('|'),
                          Link: item.link

                  };
              });

              converter.json2csv(toConvert, function(err,csv){ // convert to CSV
                  res.send(new Buffer(csv));
              });
            }
          );

});
