function initMap() {

	var mccann = {
		info: '<strong>McCann Services Inc.</strong><br>\
					7406 Ashcroft Dr.<br> Houston, Texas 77081<br>\
					<a href="https://goo.gl/maps/9ZwsyYYfXf72">Get Directions</a>',
		lat: 29.698255,
		long: -95.491095
	};


	var expertair = {
		info: '<strong>Expert Air</strong><br>\
					340 N. Sam Houston Pkwy E.<br> Houston, Texas 77060<br>\
					<a href="https://goo.gl/maps/8wzeZD2qmy12">Get Directions</a>',
		lat: 29.938908,
		long: -95.399725
	};


	var onecall = {
		info: '<strong>One Call Houston</strong><br>\
					520 Sampson St<br> Houston, Texas 77003<br>\
					<a href="https://goo.gl/maps/bToGxdtF72A2">Get Directions</a>',
		lat: 29.748279,
		long: -95.342085
	};


	var northwest = {
		info: '<strong>Northwest Instant Air A/C & Heating</strong><br>\
					Northwest Instant Air A/C & Heating<br> Waller, Texas 77484<br>\
					<a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
		lat: 29.991972,
		long: -95.961940
	};

	var mission = {
		info: '<strong>Mission Air Conditioning</strong><br>\
					1940 Fountain View Dr<br> Houston, Texas 77057<br>\
					<a href="https://goo.gl/maps/RpCt4pos6v62">Get Directions</a>',
		lat: 29.747274,
		long: -95.486519
	};


	var locations = [
      [mccann.info, mccann.lat, mccann.long, 0],
      [expertair.info, expertair.lat, expertair.long, 1],
      [onecall.info, onecall.lat, onecall.long, 2],
      [northwest.info, northwest.lat, northwest.long, 2],
      [mission.info, mission.lat, mission.long, 2],
    ];	

    var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 35.397, lng: -95.644},
          zoom: 15
        });


	var infowindow = new google.maps.InfoWindow({});

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

