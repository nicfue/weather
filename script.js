$(document).ready(function() {

  // Väder
  $('#submitWeather').click(function() {

      var city = $('#cityWeather').val();
      if (city != '') {

        $.ajax({

          url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&APPID=9464c10b789eff56ceff53e0cc4436fe',
          type: 'GET',
          dataType: 'jsonp',
          success: function(data) {
              var result = show(data);

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
    return '<h4>Aktuellt väder för '+ data.name +', '+ data.sys.country +'</h4>' +
           '<h5>Väder: '+ data.weather[0].main + '</5>' +
           '<h5>Beskrivning: <img src="http://openweathermap.org/img/w/'+ data.weather[0].icon +'.png"> '+ data.weather[0].description +'</5>' +
           '<h5>Moln: '+ data.clouds.all +'%</5>' +
           '<h5>Temperatur: '+ data.main.temp +'&deg;C</5>' +
           '<h5>Lufttryck: '+ data.main.pressure +' hpa</5>' +
           '<h5>Luftfuktighet: '+ data.main.humidity +'%</5>' +
           '<h5>Min temp: '+ data.main.temp_min +'&deg;C</5>' +
           '<h5>Max temp: '+ data.main.temp_max +'&deg;C</5>' +
           '<h5>Vindhastighet: '+ data.wind.speed +' m/s</5>' +
           '<h5>Vindriktning: '+ data.wind.deg +'&deg;</5>';
}


// Prognos
  $('#submitForecast').click(function() {

      var city = $('#cityForecast').val();
      if (city != '') {

        $.ajax({

          url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric' + '&APPID=9464c10b789eff56ceff53e0cc4436fe',
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


});
// reset text
$('input:text').focus(
  function(){
    $(this).val('');
  });
