
$(document).ready(function(){
    

    /* -------------- Add Marker function ---------------- */
    function add_marker(lat, lon){
        let position = {lat: Number(lat), lon: Number(lon)};
        map.setCenter(position);

        let marker = new google.maps.Marker({
            map: map,
            position: position
        });
    }

    /* -------------- Add first station ------------------ */
    $('#load1').on("click", function(){
        $.ajax({
            url: '/read_station',
            type: 'POST',
            data: JSON.stringify({'station_num' : 0}),
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                if(response.status === 'success'){
                    add_marker(response.lat, response.lon);
                }
            },
            error: function(error){
                console.log(error.message);
            },
        })
    });
});