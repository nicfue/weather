var api_key = '9464c10b789eff56ceff53e0cc4436fe';

// URL:er
url_weather = 'http://api.openweathermap.org/data/2.5/weather?q=';
url_forecast = 'http://api.openweathermap.org/data/2.5/forecast?q=';
url_sunrise_sunset = 'http://api.sunrise-sunset.org/json?lat='

// Vi förbereder för domen
$(document).ready(function() {

  // Väder

  // Använder selectorn för att lägga till ett click event till knappen för väder, hämtar input från #submitWeather
  $('#submitWeather').click(function() {
// Selectorn används för att hämta värdet från inmatningsfältet med id cityWeather
      var city = $('#cityWeather').val();
      // Om ingenting matas i inmatningsfältet med id "cityWeather" visas ett felmeddelande
      if (city != '') {
        // Vi använder ajax metoden för att hämta datan via url, type och dataType. För att få ut värdena i Celcius lägger vi till units=metric.
        $.ajax({
          url: url_weather + city + '&units=metric' + '&APPID=' + api_key,
          type: 'GET',
          dataType: 'jsonp',
          // JSON datan från vår request sparas i funktionen "success" som vi sedan skickar vidare till funktionen "showWeather" för att visa upp innehållet i domen.
          success: function(data) {
              var result = showWeather(data);
              console.log(data);
              // Vi använder selectorn för att visa innehållet i diven med "id=weather"
              $('#weather').html(result);
              // Inmatningsfältet nollställs efter varje inmatning.
              $('#cityWeather').val('');
          }
        });
        // Felmeddelande som visas om ingenting matas in i inmatningsfältet för Väder
      }else {
        $('#errorWeather').html("<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Fältet får ej vara tomt</div>");

      }
  });
// Funktionen "showWeather" skapas för att visa upp innehållet från JSON datan via parametern "data".
function showWeather(data) {

  console.log(data);
  var sunrise = data.sys.sunrise;
  var sunset = data.sys.sunset;
  var format = "LT";
  var sunrise_convert = moment.unix(sunrise).format(format);
  var sunset_convert = moment.unix(sunset).format(format);


// Här returneras all den data vi vill visa upp i HTML. Med plustecknet kan vi lägga till alla parametrar vi valt ut för display.
    return '<h3>Väder i '+ data.name +', '+ data.sys.country +'</h3>' +
    '<h2><img src="http://openweathermap.org/img/w/'+ data.weather[0].icon +'.png"> '+ data.main.temp + '&deg;C</h2>' +
           '<h6>'+ data.weather[0].description + '</h6> <br>' +
           '<h5>Moln: '+ data.clouds.all +'%</h5>' +
           '<h5>Temperatur: '+ data.main.temp +'&deg;C</h5>' +
           '<h5>Lufttryck: '+ data.main.pressure +' hPa</h5>' +
           '<h5>Luftfuktighet: '+ data.main.humidity +'%</h5>' +
           '<h5>Min temp: '+ data.main.temp_min +'&deg;C</h5>' +
           '<h5>Max temp: '+ data.main.temp_max +'&deg;C</h5>' +
           '<h5>Vindhastighet: '+ data.wind.speed +' m/s</h5>' +
           '<h5>Vindriktning: '+ data.wind.deg +'&deg;</h5>'+
           '<h5>Soluppgång: '+ sunrise_convert +' </h5>' +
           '<h5>Solnedgång: '+ sunset_convert +'</h5>';

}


// Prognos

// Använder selectorn för att lägga till ett click event till knappen för Väderprognos, hämtar input från #submitForecast
  $('#submitForecast').click(function() {
    // Selectorn används för att hämta värdet från inmatningsfältet med id cityForecast
      var city = $('#cityForecast').val();
      // Om ingenting matas i inmatningsfältet med id "cityForecast" visas ett felmeddelande
      if (city != '') {
        // Vi använder ajax metoden för att hämta datan via url, type och dataType. För att få ut värdena i Celcius lägger vi till units=metric.
        $.ajax({
          url: url_forecast + city + '&units=metric' + '&APPID=' + api_key,
          type: 'GET',
          dataType: 'jsonp',
          // JSON datan från vår request sparas i funktionen "success" som vi sedan skickar vidare till funktionen "showForecast" för att visa upp innehållet i domen.
          success: function(data) {
              var result = showForecast(data);
              // Vi använder selectorn för att visa innehållet i diven med "id=forecast"
              $('#forecast').html(result);
              // Inmatningsfältet nollställs efter varje inmatning.
              $('#cityForecast').val('');
          }
        });

        // Felmeddelande som visas om ingenting matas in i inmatningsfältet för Väderprognos
      }else {
        $('#errorForecast').html("<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Fältet får ej vara tomt</div>");

      }
  });

  // Funktionen "showForecast" skapas för att visa upp innehållet från JSON datan via parametern "data".
function showForecast(data) {
  console.log(data);
  var html = '',
  cityName = data.city.name,
  country = data.city.country

html += '<h3>5-dagars prognos med 3-timmars intevaller ' + cityName +', '+ country +'</h3>'

data.list.forEach(function(currentValue, index, list) {
  html += '<h5 class="table-active stripe">'+ currentValue.dt_txt +': '+ currentValue.main.temp +' &deg;C </h5>'
})
$('#forecast').html(html)
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

  return '<h2>Soluppgång: '+ data.results.sunrise +' <br> <img src="app/pictures/sunrise.png" width="470" height="300" alt="sunrise"</h2>';
}

function showSunset(data) {
  return '<h2 class="sunset"> Solnegång: '+ data.results.sunset +' <br> <img src="app/pictures/sunset.png" width="450" height="320" alt="sunrise"</h2>';
  }
 })

});


// reset text
$('input:text').focus(
  function(){
    $(this).val('');
  });
