# NF väder

- Nicolas Fuentes
- Kurs: JavaScript 2
- Utbildning: Frontend
- Uppgift: AJAX Assignment - Open APIs


<img align="right" width="180" height="auto" src="http://cdn4.iconfinder.com/data/icons/iconsland-weather/PNG/256x256/Sunrise.png" alt="sunrise">


## Kort beskrivning
En väderapplikation som har till syfte att på ett enkelt sätt visa upp intresseant väderinformation för användaren.  

Väderapplikation visar direkt klockslaget för soluppgång och solnedgång på den specifika plats du befinner dig på.

Det går att söka på alla städer i hela världen och få fram väderinformation för den specifika staden. Information som visas är följande:
- Moln (%)
- Temperatur (Celcius) 
- Lufttryck (hPa)
- Luftfuktighet (%)
- Min temp (Celcius)
- Max temp (Celcius)
- Vindhastighet (m/s)
- Vindriktning (deg)
- Soluppgång (AM)
- Solnedgång PM)

**Observera att tiden visas i AM och PM, där AM motsvarar tiden på förmiddagen och PM motsvarar tiden på eftermiddagen.**

Det går att söka på en stad för att få fram en fem-dagars prognos med tre-timmars intervaller. 


## Arbetsprocess
De metoder jag använt mig av är jQuery Ajax, getJSON och API.

$ajax har jag använt för att hämta hem data från ett api från http://openweathermap.org.

* [**Current weather data**](http://openweathermap.org/current)

* [**5 day / 3 hour forecast**](http://openweathermap.org/forecast5)


I min arbetsprocess med JavaScript har jag börjat med att hämta värdet från inmatningsfälten för Väder och Prognos. Därefter har jag hämtat hem all JSON data med metoden jQuery ajax och sparat ned datan i vardera success funktion. Sedan skapade jag funktioner för respektive del i syfte att kunna visa upp innehållet i HTML. Openweathermap erbjuder en mängd olika parametrar för väderinformation och jag valde de tio parametrarna som visas på listan här ovan. När jag hämtar datan med $ajax har jag även lagt till en parameter för att omvandla enheten för temperatur till Celcius, då den i standard anges i Kelvin. 

Beträffande delen för Väderprognos valde jag att enbart visa upp datum, tidpunkt och temperatur. Slutligen gjorde jag funktionen för soluppgång och solnedgång som visas först på sidan. Här är tanken att den ska visa den exakta tidpunkten för solnedgång och soluppgång på den plats just du befinner dig på. För detta använde jag meotden getJSON för att hämta JSON data från (http://ipinfo.io/). Här får jag ut koordinaterna i form av en sträng som jag sedan konvertrar till en array. Därefter matar jag in värdena för latitude och longitude från arrayen i $ajax funktionen och sparar ned datan i en success funktion. Sedan skapade jag två olika funktioner för att visa upp datan i HTML. 

## Todos
- Jag vill omvandla enheten för tid från AM PM till 24-timmars enhet.  
- Jag vill lägga in kartor med olika kartfunktioner för exempelvis moln, temperatur och vind. 

 [**Weather map layers** @ openweathermap](http://openweathermap.org/api/maps)
 
 
## Liveversion av NF Väder

* [**NF väder**](https://github.com/nicfue/weather/)

