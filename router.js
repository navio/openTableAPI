var router  = require('express').Router();
var util    = require('./util.js');
var scraper = require('./scraper.js');

module.exports = router;

router.get('/',function(req,res){
  res.send('Main Scrapper');
});

router.get('/scrape/json', function(req, res){

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


router.get('/scrape/csv', function(req, res){

   cover = req.params.cover || 2; // OpenTable default.
   datetime = req.params.datetime || '10/18/2014 7:00%20PM'; // current time from requester.
   metroid = req.param.metroid || 4; //can be replaced to requester location

   scraper(util.urlGenerator(cover,datetime,metroid),
           function(err,table){
              res.json(table);
            }
          );

});
