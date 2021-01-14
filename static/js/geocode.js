
$(document).ready(function(){
    var events_counter = 0;

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

        events_counter++;
    }

    function add_inter_marker(lat1, lon1, lat2, lon2){
        let position1 = new google.maps.LatLng(lat1,lon1);
        let position2 = new google.maps.LatLng(lat2,lon2);
       

        let marker1 = new google.maps.Marker({
            map: map,
            position: position1,
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }
        });

        let marker2 = new google.maps.Marker({
            map: map,
            position: position2,
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }
        });


        
    }

    function calculate(){
        $.ajax({
            url: '/calculate',
            type: 'GET',
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                if(response.status === 'success'){
                    add_marker(response.lat, response.lon, 0);
                }
            },
            error: function(error){
                console.log(error.message);
            },
        })
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
                    if(events_counter == 2){
                        add_inter_marker(lat1=37.3981, lon1=21.2486, lat2=28.2486, lon2=34.3981);
                    }
                    
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
                    if(events_counter >= 3){
                        calculate();
                    }
                }
            },
            error: function(error){
                console.log(error.message);
            },
        })
    });
});