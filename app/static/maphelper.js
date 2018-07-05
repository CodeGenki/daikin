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

function calcdistance(distancematrix, origin, destination){
  
  console.log(newcoords.lat + ", " + newcoords.lng + " inside function");
  distancematrix.getDistanceMatrix(
  {
    origins : origin,
    destinations : destination,
    travelMode : "DRIVING",
  }, callback);
}

function callback(response, status){
  if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }

}