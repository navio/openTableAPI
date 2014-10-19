var router  = require('express').Router();
var util    = require('./util.js');
var scraper = require('./scraper.js');

module.exports = router;

router.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

router.get('/raw', function(req, res){  // Extra json link

   cover = req.params.cover || 2; // OpenTable default.
   datetime = req.params.datetime || '10/19/2014 7:00%20PM'; // current time from requester.
   metroid = req.param.metroid || 4; //can be replaced to requester location

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

router.get('/json', function(req, res){  // Extra json link

   cover = req.params.cover || 2; // OpenTable default.
   datetime = req.params.datetime || '10/19/2014 7:00%20PM'; // current time from requester.
   metroid = req.param.metroid || 4; //can be replaced to requester location

   scraper(util.urlGenerator(cover,datetime,metroid,'false'),
            function(err,table){
              if(err) res.send('err'); //probably insecure but for dev purpose left.
              var openTable = table;
              scraper(util.urlGenerator(cover,datetime,metroid,'true'), // Totally forgot about this || toREFACTOR
                function(err,table){
                  if(err) res.send('err');
                  var joinedTables = openTable.concat(table);
                  res.json(cleanView(joinedTables));
                });
            });
});


router.get('/csv', function(req, res){

   cover = req.params.cover || 2; // OpenTable default.
   datetime = req.params.datetime || '10/18/2014 7:00%20PM'; // current time from requester.
   metroid = req.param.metroid || 4; //can be replaced to requester location

   var converter = require('json-2-csv');

   scraper(util.urlGenerator(cover,datetime,metroid,false),
            function(err,table){
              if(err) res.send('err'); //probably insecure but for dev purpose left.
              var openTable = table;
              scraper(util.urlGenerator(cover,datetime,metroid,true), // Totally forgot about this || toREFACTOR
                function(err,table){
                  if(err) res.send('err');
                  var joinedTables = openTable.concat(table);
                  converter.json2csv(cleanView(table), function(err,csv){ // convert to CSV
                      res.send(new Buffer(csv));
                  });
                });
            });

});


function cleanView(dirtyArray){

  return dirtyArray.map(function(item){ // Cleaning view to adjust requirements.

    var cleanWindow = item.windows.join('|');
    if(cleanWindow === '') cleanWindow = 0 ;
    if(item.reviews === '') item.reviews = 'No Reviews'

    return {
              Name:item.name,
              Neighborhood:item.neighborhood,
              Cuisine:item.cuisine,
              Reviews: item.reviews,
              Window: cleanWindow,
              Link: item.link
      };
  });


}
