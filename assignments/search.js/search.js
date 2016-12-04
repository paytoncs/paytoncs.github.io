// Wunderground API Key: d1230b7c1330b01d
// Get the data from the wunderground API
$("#iconFig").hide();

function getData(lat, lon) {
    $.ajax({
        url: 'https://api.wunderground.com/api/d1230b7c1330b01d/geolookup/conditions/forecast/q/' + lat + ',' + lon + '.json',
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            var location = data.location.city + ', ' + data.location.state;
            var temp = Math.round(data.current_observation.temp_f);
            var summary = data.current_observation.weather;
            var highTemp = Math.round(data.forecast.simpleforecast.forecastday["0"].high.fahrenheit);
            var lowTemp = Math.round(data.forecast.simpleforecast.forecastday["0"].low.fahrenheit);
            var icon = data.current_observation.icon;
            var iconURL = '"https://icons.wxug.com/i/c/k/' + icon + '.gif"';
            $('#cityDisplay').text(location);
            $('title').text(location + ' | Weather Home');
            $('#currentTemp').text(temp + "°F");
            $('#highTemp').text("High: " + highTemp + "°F");
            $('#lowTemp').text("Low: " + lowTemp + "°F");
            $('#iconFig').html("<img src=" + iconURL + " alt=" + icon + ">" + "<figcaption id='searchSummary'></figcaption>");
            $('#searchSummary').text(summary);
            $("#cover").fadeOut(250);
        }
    });
}

$('#query').keyup(function () {
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");
    $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data); // test for JSON received
        // Begin building output
        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="#"' + ' onclick="getData(' + val.lat + ',' + val.lon + ')"' + ' title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
            }
        }); // end each
        output += '</ol>';
        $("#searchResults").html(output); // send results to the page
    }); // end getJSON
}); // end onkeyup

// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
    evt.preventDefault();
    var i = $(this).index('a');
    console.log(i);
    $("#searchResults").hide();
    $("#resultsHeading").hide();
    $("#iconFig").show();
    var city = $(this).text(); // Franklin, etc...
    console.log(city);
    getData(i.lat, i.lon);
});
