module.exports = {


  newDateFormat: function(){
                    var d = new Date();
                    return d.getMonth()+'/'+d.getDate()+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
                  },

  urlGenerator: function(cover,datetime,metroid){
                      return 'http://www.opentable.com/s/'
                              +'?datetime=' + datetime
                              +'&covers=' + cover
                              +'&metroid='+ metroid
                              +'&showmap=false&&popularityalgorithm=NameSearches&tests=EnableMapview,ShowPopularitySortOption,srs,customfilters&sort=Popularity&excludefields=Description';
  }

}
