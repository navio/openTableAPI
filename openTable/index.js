var router  = require('express').Router();
var util    = require('./util.js');
var scraper = require('./scraper.js');

module.exports = router;

router.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

router.get('/raw', function(req, res){  // Raw to debug and other projects

   cover = req.query.cover || 2; // OpenTable default.
   datetime = req.query.datetime || '10-19-2014 7:00%20PM'; // current time from requester.
   metroid = req.query.cityid || 4; //can be replaced to requester location

   scraper(util.urlGenerator(cover,datetime,metroid,'false'),
            function(err,table){
              if(err) res.send('err'); //probably insecure but for dev purpose left.
              var openTable = table;
              scraper(util.urlGenerator(cover,datetime,metroid,'true'), // Totally forgot about this || toREFACTOR
                function(err,table){
                  if(err) res.send('err');
                  var joinedTables = openTable.concat(table);
                  res.json(joinedTables);
                });
            });
});

router.get('/json', function(req, res){

   cover = req.query.cover || 2; // OpenTable's default.
   datetime = req.query.datetime || '10-19-2014 7:00%20PM'; // current time from requester.
   metroid = req.query.cityid || 4; //can be replaced to requester location || Challenge example

   scraper(util.urlGenerator(cover,datetime,metroid,'false'),
            function(err,table){
              if(err) res.send('err'); //probably insecure but for dev purpose left.
              var openTable = table;
              scraper(util.urlGenerator(cover,datetime,metroid,'true'), // Totally forgot about this || toREFACTOR
                function(err,table){
                  if(err) res.send('err');
                  var joinedTables = openTable.concat(table);
                  res.json(util.cleanView(joinedTables));
                });
            });
});

router.get('/csv', function(req, res){

   cover = req.query.cover || 2;
   datetime = req.query.datetime || '10-19-2014 7:00%20PM';
   metroid = req.query.cityid || 4;

   var converter = require('json-2-csv');

   scraper(util.urlGenerator(cover,datetime,metroid,false),
            function(err,table){
              if(err) res.send('err'); //probably insecure but for dev purpose left.
              var openTable = table;
              scraper(util.urlGenerator(cover,datetime,metroid,true), // Totally forgot about this || toREFACTOR
                function(err,table){
                  if(err) res.send('err');
                  var joinedTables = openTable.concat(table);
                  converter.json2csv(util.cleanView(table), function(err,csv){ // convert to CSV
                      res.send(new Buffer(csv));
                  });
                });
            });

});
