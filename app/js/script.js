var api_key = '9464c10b789eff56ceff53e0cc4436fe';

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
          url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&APPID=' + api_key,
          type: 'GET',
          dataType: 'jsonp',
          jsonpCallback: "ajax_request",
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
    return '<h2>Väder i '+ data.name +', '+ data.sys.country +'</h2>' +
    '<h2><img src="http://openweathermap.org/img/w/'+ data.weather[0].icon +'.png"> '+ data.main.temp + '&deg;C</h2>' +
           '<h6>'+ data.weather[0].description + '</h6> <br>' +
           '<h3>Moln: '+ data.clouds.all +'%</h3>' +
           '<h3>Temperatur: '+ data.main.temp +'&deg;C</h3>' +
           '<h3>Lufttryck: '+ data.main.pressure +' hPa</h3>' +
           '<h3>Luftfuktighet: '+ data.main.humidity +'%</h3>' +
           '<h3>Min temp: '+ data.main.temp_min +'&deg;C</h3>' +
           '<h3>Max temp: '+ data.main.temp_max +'&deg;C</h3>' +
           '<h3>Vindhastighet: '+ data.wind.speed +' m/s</h3>' +
           '<h3>Vindriktning: '+ data.wind.deg +'&deg;</h3>'+
           '<h3>Soluppgång: '+ sunrise_convert +' </h3>' +
           '<h3>Solnedgång: '+ sunset_convert +'</h3>';
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
          url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric' + '&APPID=' + api_key,
          type: 'GET',
          dataType: 'jsonp',
          jsonpCallback: "ajax_request",
          // JSON datan från vår request sparas i funktionen "success" som vi sedan skickar vidare till funktionen "showForecast" för att visa upp innehållet i domen.
          success: function(data) {
              var result = showForecast(data);
              // Vi använder selectorn för att visa innehållet i diven med "id=forecast" som hämtar data från funktionen showForecast som kallas på via funktionen html
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

// Vi hämtar JSON data från city objektet och skriver ut till HTML-tagg
html = '<h2>5-dagars prognos med 3-timmars intevaller ' + data.city.name +', '+ data.city.country +'</h2>'

// Vi loopar igenom List objektet med forEach metoden och får ut datum och tid samt temperatur för respektive dag i prognosen. Skriver ut till HTML-tagg.
data.list.forEach(function(currentValue, index, list) {
  html += '<h4 class="table-active stripe">'+ currentValue.dt_txt +': '+ currentValue.main.temp +' &deg;C </h4>'
})
// Kallar på funktionen med .html
$('#forecast').html(html)
}


// sunrise & sunset
// Funktion för att ta reda på vilken tid det blir soluppgång och solnedgång på din specifika lokalisering
$(function() {
  var loc;
// Vi använder getJSON för att hämta information från din befintliga lokalisering
  $.getJSON('http://ipinfo.io/', function(coord){
    console.log(coord); //loggar ut koordinaterna i form av en sträng
    // Vi behöver omvandla koordinaterna till en array vilket vi gör med split metoden
    loc = coord.loc.split(",");
    console.log(loc);
    // Vi hämtar information från sunrise-sunset.org api och lägger till värdena för latitud och longitude från arrayen
    $.ajax({
      url: 'http://api.sunrise-sunset.org/json?lat=' + loc[0] + '&lng=' + loc[1],
      type: "GET",
      dataType: 'jsonp',
      jsonpCallback: "ajax_request",
      // JSON datan från vår request sparas i funktionen "success" som vi sedan skickar vidare till funktionen "showSunrise" och "showSunset" för att visa upp innehållet i domen.
      success: function(data) {
        console.log(data);
        let sunrise  = showSunrise(data)
        $('#display1').html(sunrise);
        let sunset = showSunset(data)
        $('#display2').html(sunset);
      }
    })
  })

// Funktionen "showSunrise" skapas för att visa upp innehållet från JSON datan via parametern "data".
function showSunrise(data){
  return '<h2>Soluppgång: '+ data.results.sunrise +' <br><br> <img src="app/pictures/sunrise.png" alt="sunrise" class="sunrisepic"</h2>';
}
// Funktionen "showSunset" skapas för att visa upp innehållet från JSON datan via parametern "data".
function showSunset(data) {
  return '<h2>Solnedgång: '+ data.results.sunset +' <br><br> <img src="app/pictures/sunset.png" alt="sunrise" class="sunsetpic"</h2>';
  }
 })

});


// reset text
$('input:text').focus(
  function(){
    $(this).val('');
  });
