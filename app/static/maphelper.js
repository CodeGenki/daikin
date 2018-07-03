function getcoordinates(geocoder, resultsMap, address){
        //var geocoder = new google.map.Geocoder();
        var newcoords;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            var newlat = results[0].geometry.viewport.f.f;
            var newlong = results[0].geometry.viewport.b.b;
            newcoords = { lat : newlat, lng : newlong};
            console.log(newcoords.lat + ", " + newcoords.lng + " inside function");
            return newcoords;
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
            //return newcoords;
        });
      }