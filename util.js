module.exports = {


  newDateFormat: function(){
                    var d = new Date();
                    return d.getMonth()+'/'+d.getDate()+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
                  },

  urlGenerator: function(cover,datetime,metroid,full){
    //onlyunavailable=true
    //return 'http://www.opentable.com/s/?datetime=&covers=2&metroid=4&regionids=5&showmap=false&popularityalgorithm=NameSearches&tests=EnableMapview,ShowPopularitySortOption,srs,customfilters&sort=Popularity&excludefields=Description&';

                      return 'http://www.opentable.com/s/'
                              +'?datetime=' + datetime
                              +'&covers=' + cover
                              +'&metroid='+ metroid
                              +'&onlyunavailable='+ full
                              +'&showmap=false&&popularityalgorithm=NameSearches&tests=EnableMapview,ShowPopularitySortOption,srs,customfilters&sort=Popularity&excludefields=Description';
  }

}
