
$(document).ready(function(){
    

    /* -------------- Add Marker function ---------------- */
    function add_marker(lat, lon, radius){
        let position = new google.maps.LatLng(lat,lon);
        map.setCenter(position);

        let marker = new google.maps.Marker({
            map: map,
            position: position
        });

        let circle = new google.maps.Circle({
            radius: parseInt(radius), // Circle radius in meters
            map: map,
            center: position,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
        });
    }


    /* -------------- Add first station ------------------ */
    $('#load1').on("click", function(){
        $.ajax({
            url: '/read_station',
            type: 'POST',
            data: JSON.stringify({'event_num' : 0}),
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                if(response.status === 'success'){
                    add_marker(response.lat, response.lon, response.radius);
                }
            },
            error: function(error){
                console.log(error.message);
            },
        })
    });

    $('#load2').on("click", function(){
        $.ajax({
            url: '/read_station',
            type: 'POST',
            data: JSON.stringify({'event_num' : 1}),
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                if(response.status === 'success'){
                    add_marker(response.lat, response.lon, response.radius);
                }
            },
            error: function(error){
                console.log(error.message);
            },
        })
    });

    $('#load3').on("click", function(){
        $.ajax({
            url: '/read_station',
            type: 'POST',
            data: JSON.stringify({'event_num' : 2}),
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                if(response.status === 'success'){
                    add_marker(response.lat, response.lon, response.radius);
                }
            },
            error: function(error){
                console.log(error.message);
            },
        })
    });
});