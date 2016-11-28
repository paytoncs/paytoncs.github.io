// Current Location Scripts
$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
    function getData(lat, long) {
        $.ajax({
            url: 'https://api.wunderground.com/api/d1230b7c1330b01d/geolookup/conditions/q/' + lat + ',' + long + '.json',
            dataType: "jsonp",
            success: function (data) {
                console.log(data);
                var location = data.location.city + ', ' + data.location.state;
                var temp = Math.round(data.current_observation.temp_f);
                var summary = data.current_observation.weather;
                var precip = data.current_observation.precip_today_in;
                var feelsLike = data.current_observation.feelslike_f;
                var windDir = data.current_observation.wind_dir;
                $('#cityDisplay').text(location);
                $('title').text(location + ' | Weather Home');
                $('#currentTemp').text(temp + "°F");
                $('#summary').text(summary);
                $('#add1').text("Feels Like: " + feelsLike + "°F");
                $('#add2').text("Precipitation: " + precip + " inches");
                $('#add3').text("Wind Direction: " + windDir);
                $("#cover").fadeOut(250);
            }
        });
    }



    //  You are to get the current temperature and display it into the li with an id of currentTemp. Make sure you use JavaScript to round the number to the closest integer and display the degree symbol following the number.



    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
});