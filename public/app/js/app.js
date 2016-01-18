var app = angular.module('busesLiveApp', ['ngMap']);

app.constant('CONFIG', {
    "transportAPI": {
        "url": "http://transportapi.com/v3/uk/bus",
        "key": "44a684e1128915a5aeabdfbcae55b744",
        "app_id": "8fb7c55f"
    },
    "googleMapsAPI": {
        "url": "http://maps.googleapis.com/maps/api/geocode/json?address=",
        "marker": "images/bus-marker.png"
    },
    "messages": {
        "no_results": "Sorry!... we couldn't get any results. Please check your postcode or address and try again.",
        "no_empty": "Please insert a valid Postcode or Address and press search"
    }
});
