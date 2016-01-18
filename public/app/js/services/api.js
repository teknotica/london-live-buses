app.factory('api', function($http, CONFIG) {
    return {
        // Get Google Maps coordinates from search input
        getMapsCoordinates: function(searchText) {
            return $http.get(CONFIG.googleMapsAPI.url + encodeURIComponent(searchText) + '&sensor=false');
        },
        // Get nearest bus stops from latitude and longitude values
        getNearbyStops: function(lat, lng) {
            return $http.jsonp(CONFIG.transportAPI.url + '/stops/near.json?lat=' + lat + '&lon=' + lng + '&api_key=' + CONFIG.transportAPI.key + '&app_id=' + CONFIG.transportAPI.app_id + '&callback=JSON_CALLBACK');
        },
        // Get bus live info from ATCO Code
        getLiveBusInfo: function(atcocode) {
            return $http.jsonp(CONFIG.transportAPI.url + '/stop/' + atcocode + '/live.json?group=route&api_key=' + CONFIG.transportAPI.key + '&app_id=' + CONFIG.transportAPI.app_id + '&callback=JSON_CALLBACK');
        }
    }
})
