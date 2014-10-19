module.exports = {


  newDateFormat: function(){
              var d = new Date();
              return d.getMonth()+'/'+d.getDate()+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
  },

  urlGenerator: function(cover,datetime,metroid,full){
              var response = 'http://www.opentable.com/s/'
                              +'?datetime=' + datetime
                              +'&covers=' + cover
                              +'&metroid='+ metroid
                              +'&showmap=false&&popularityalgorithm=NameSearches&tests=EnableMapview,ShowPopularitySortOption,srs,customfilters&sort=Popularity&excludefields=Description';

              if(full === 'true'){
                response = response+'&onlyunavailable=true';
              }

              console.log(response);
              return response;
  },

  cleanView: function(dirtyArray){

    return dirtyArray.map(function(item){ // Cleaning view to adjust requirements.

      if(item.windows.length > 0 ){
        for(win in item.windows){
          item.windows[win] = minutesToHours(item.windows[win]);
        }
      }

      function minutesToHours(minutes){
        var realmin = minutes % 60;
        var hours = Math.floor(minutes / 60);

        realmin = (realmin < 10 ? '0' : '') + realmin;
        hours = (hours < 10 ? '0' : '') + hours;

        return hours+':'+realmin;
      }

      item.windows = item.windows.join(' | ');
      if(item.windows === '') item.windows = 0 ;
      if(item.reviews === '') item.reviews = 'No Reviews'

      return {
                Name:item.name,
                Neighborhood:item.neighborhood,
                Cuisine:item.cuisine,
                Reviews: item.reviews,
                Window: item.windows,
                Link: item.link
        };
    });


  },


}
