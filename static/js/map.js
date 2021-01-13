var map;

function initMap(){
    var center = {lat:37.983810, lng: 23.727539};

    var map_options = {
        zoom: 8,
        center: center,
        mapTypeId: 'satellite'
    };

    map = new google.maps.Map(document.getElementById('map'), map_options);

}