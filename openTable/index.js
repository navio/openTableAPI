var router  = require('express').Router();
var async   = require('async');
var util    = require('./util.js');
var scraper = require('./scraper.js');

module.exports = router;

router.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

router.get('/experiment', function(req,res){
  scraper(function(){
    res.json('das');
  });
});

// router.get('/raw', function(req, res){  // Raw to debug and other projects
//
//    cover = req.query.cover || 2; // OpenTable default.
//    datetime = req.query.datetime || '10-25-2014 7:00%20PM'; // current time from requester.
//    metroid = req.query.cityid || 4; //can be replaced to requester location
//
//    async.map([util.urlGenerator(cover,datetime,metroid,'false'),
//                util.urlGenerator(cover,datetime,metroid,'true')],
//                scraper,
//                function(err,table){
//                  if(err) console.log('there was an error'+err);
//                  var tables = table[0].concat(table[1]);
//                  res.json(tables);
//                }
//              );
//
// });
//
// router.get('/json', function(req, res){
//
//    cover = req.query.cover || 2; // OpenTable's default.
//    datetime = req.query.datetime || '10-25-2014 7:00%20PM'; // current time from requester.
//    metroid = req.query.cityid || 4; //can be replaced to requester location || Challenge example
//
//    async.map([util.urlGenerator(cover,datetime,metroid,'false'),
//                util.urlGenerator(cover,datetime,metroid,'true')],
//                scraper,
//                function(err,table){
//                  if(err) console.log('there was an error'+err);
//                  var tables = table[0].concat(table[1]);
//                  res.json(util.cleanView(tables));
//                }
//              );
// });
//
// router.get('/csv', function(req, res){
//
//    cover = req.query.cover || 2;
//    datetime = req.query.datetime || '10-25-2014 7:00%20PM';
//    metroid = req.query.cityid || 4;
//
//    var converter = require('json-2-csv');
//
//    async.map([util.urlGenerator(cover,datetime,metroid,'false'),
//               util.urlGenerator(cover,datetime,metroid,'true')],
//               scraper,
//               function(err,table){
//                 if(err) console.log('there was an error'+err);
//                 var tables = table[0].concat(table[1]);
//                 converter.json2csv(util.cleanView(table), function(err,csv){ // convert to CSV
//                     res.send(new Buffer(csv));
//                 });
//               }
//             );
// });
