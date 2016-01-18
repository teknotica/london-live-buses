app.controller('mainCtrl', function($scope, api, CONFIG) {

    // Default map center point (London)
    $scope.mapCenter = {
        "lat": 51.507351,
        "lng": -0.127758
    };
    $scope.marker = CONFIG.googleMapsAPI.marker;
    $scope.message = "";

    // Clear displayed messages
    $scope.clearNotification = function() {
        $scope.message = "";
        $scope.resetScope();
    };

    // Reset all scope variables
    $scope.resetScope = function() {
        $scope.nearbyStops = "";
        $scope.busDepartures = "";
        $scope.selectedBusStop = "";
    };

    $scope.getMapsCoordinates = function(searchText) {

        $scope.resetScope();

        if (searchText) {

            api.getMapsCoordinates(searchText).then(function(d) {

                if (d.data && d.data.status == "OK") {

                    var lat = d.data.results[0].geometry.location.lat;
                    var lng = d.data.results[0].geometry.location.lng;
                    // Get nearby stops
                    $scope.getNearbyStops(lat, lng);

                } else {
                    $scope.message = CONFIG.messages.no_results;
                }
            });
        } else {
            $scope.message = CONFIG.messages.no_empty;
        }
    };

    $scope.getNearbyStops = function(lat, lng) {

        api.getNearbyStops(lat, lng).then(function(d) {

            if (d && d.data) {

                // Nearby stops array
                $scope.nearbyStops = [];

                if (d.data.stops.length > 0) {

                    var firstTime = false;

                    for (var stop in d.data.stops) {

                        firstTime = true;
                        var stop_coordinates = [d.data.stops[stop].latitude, d.data.stops[stop].longitude];

                        // Center map with first match
                        if (firstTime == true) {
                            $scope.mapCenter = {
                                "lat": stop_coordinates[0],
                                "lng": stop_coordinates[1]
                            };
                        }

                        var stop_obj = {
                            'coordinates': stop_coordinates,
                            'info': d.data.stops[stop]
                        }

                        // Push stop object into result array
                        $scope.nearbyStops.push(stop_obj);
                    }
                } else {
                    $scope.message = CONFIG.messages.no_results;
                }
            }
        });
    };

    $scope.getLiveBusInfo = function(stopInfo) {

        api.getLiveBusInfo(stopInfo.atcocode).then(function(d) {

            if (d.data && d.data.departures) {

                $scope.selectedBusStop = {
                    "name": stopInfo.name,
                    "indicator": stopInfo.indicator
                };

                $scope.busDepartures = d.data.departures;
            }
        });
    };
});
