var api_key = '9464c10b789eff56ceff53e0cc4436fe';

// URL:er
url_weather = 'http://api.openweathermap.org/data/2.5/weather?q=';
url_forecast = 'http://api.openweathermap.org/data/2.5/forecast?q=';
url_sunrise_sunset = 'http://api.sunrise-sunset.org/json?lat='

$(document).ready(function() {

  // Väder
  $('#submitWeather').click(function() {

      var city = $('#cityWeather').val();
      if (city != '') {

        $.ajax({
          url: url_weather + city + '&units=metric' + '&APPID=' + api_key,
          type: 'GET',
          dataType: 'jsonp',
          success: function(data) {
              var result = show(data);
              console.log(data);

              $('#show').html(result);
              $('#city').val('');
          }
        });
      }else {
        $('#errorWeather').html("<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Fältet får ej vara tomt</div>");

      }
  });

function show(data) {

  console.log(data);
  var sunrise = data.sys.sunrise;
  var sunset = data.sys.sunset;
  var format = "LT";
  var sunrise_convert = moment.unix(sunrise).format(format);
  var sunset_convert = moment.unix(sunset).format(format);

    return '<h4>Väder i '+ data.name +', '+ data.sys.country +'</h4>' +
    '<h2><img src="http://openweathermap.org/img/w/'+ data.weather[0].icon +'.png"> '+ data.main.temp + '&deg;C</h2>' +
           '<h6>'+ data.weather[0].main + '</h6>' +
           '<h5>Moln: '+ data.clouds.all +'%</h5>' +
           '<h5>Temperatur: '+ data.main.temp +'&deg;C</h5>' +
           '<h5>Lufttryck: '+ data.main.pressure +' hpa</h5>' +
           '<h5>Luftfuktighet: '+ data.main.humidity +'%</h5>' +
           '<h5>Min temp: '+ data.main.temp_min +'&deg;C</h5>' +
           '<h5>Max temp: '+ data.main.temp_max +'&deg;C</h5>' +
           '<h5>Vindhastighet: '+ data.wind.speed +' m/s</h5>' +
           '<h5>Vindriktning: '+ data.wind.deg +'&deg;</h5>'+
           '<h5>Soluppgång: '+ sunrise_convert +' </h5>' +
           '<h5>Solnedgång: '+ sunset_convert +'</h5>';

}


// Prognos
  $('#submitForecast').click(function() {

      var city = $('#cityForecast').val();
      if (city != '') {

        $.ajax({
          url: url_forecast + city + '&units=metric' + '&APPID=' + api_key,
          type: 'GET',
          dataType: 'jsonp',
          success: function(forecast) {
              var result = show2(forecast);

              $('#show2').html(result);
              $('#city').val('');
          }
        });
      }else {
        $('#errorForecast').html("<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Fältet får ej vara tomt</div>");

      }
  });

function show2(forecast) {
  console.log(forecast);
  var html = '',
  cityName = forecast.city.name,
  country = forecast.city.country

html += '<h4>5-dagars prognos med 3-timmars intevaller ' + cityName +', '+ country +'</h4>'

forecast.list.forEach(function(forecastEntry, index, list) {
  html += '<h5 class="table-active stripe">'+forecastEntry.dt_txt +': '+forecastEntry.main.temp +' &deg;C </h5>'
})
$('#show2').html(html)
}


// sunrise & sunset
$(function() {
  var loc;

  $.getJSON('http://ipinfo.io/', function(coord){
    console.log(coord);
    loc = coord.loc.split(",");
    console.log(loc);

    $.ajax({
      url: url_sunrise_sunset + loc[0] + '&lng=' + loc[1],
      type: "GET",
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        let sunrise  = showSunrise(data)
        $('#display1').html(sunrise);
        let sunset = showSunset(data)
        $('#display2').html(sunset);
      }

    })
  })
function showSunrise(data){

  return '<h1>Soluppgång: '+ data.results.sunrise +' <br> <img src="app/pictures/sunrise.png" width="470" height="300" alt="sunrise"</1>';
}

function showSunset(data) {
  return '<h1 class="sunset"> Solnegång: '+ data.results.sunset +' <br> <img src="app/pictures/sunset.png" width="450" height="320" alt="sunrise"</h1>';
  }
 })

});


// reset text
$('input:text').focus(
  function(){
    $(this).val('');
  });
