# Min väderapp

Nicolas Fuentes
Kurs: JavaScript 2
Utbildning: Frontend
Uppgift: AJAX Assignment - Open APIs


<img align="right" width="180" height"auto" src="http://cdn4.iconfinder.com/data/icons/iconsland-weather/PNG/256x256/Sunrise.png" alt="sunrise">


## Kort beskrivning:
Jag har gjort en väderapplikation som har till syfte att på ett enkelt sätt visa upp intresseant väderinformation för användaren.  

Väderapplikation visar direkt klockslaget för soluppgång och solnedgång på den specifika plats du befinner dig på.

Det går även att själv söka på alla städer i hela världen och få fram väderinformation för den specifika staden. Information som visas är följande:
Moln (%)
Temperatur (Celcius) 
Lufttryck (hPa)
Luftfuktighet (%)
Min temp (Celcius)
Max temp (Celcius)
Vindhastighet (m/s)
Vindriktning (deg)
Soluppgång (AM)
Solnedgång PM)


**Observera att tiden visas i AM och PM, där AM motsvarar tiden på förmiddagen och PM motsvarar tiden på eftermiddagen.**

Det går även att söka på en stad för att få fram en fem-dagars prognos med tre-timmars intervaller. 

De metoder jag använt mig av är jQuery Ajax, getJSON och API.

$ajax har jag använt när jag hämtat hem data från api på http://openweathermap.org.

* [**Current weather data** @ openweathermap](http://openweathermap.org/current)

* [**5 day / 3 hour forecast** @ openweathermap](http://openweathermap.org/forecast5)

* [**Min väderapp** av Nicolas Fuentes_ @ GitHub](https://github.com/nicfue/weather/)


I min arbetsprocess med javascript har jag börjat med att knappen och inmatningsfältet för väder. Därefter gick jag över till knappen och inmatningsfältet för väderprognoser. När dessa två var klara skrev jag koden för solnedgång och soluppgång. 

En sak jag inte har lyckats åstadkomma är att omvandla tiden från AM PM till 24-timmars klockslag. Detta är någonting jag kommer försöka attt lösa. Sedan skulle jag även vilja lägga in olika kartfunktioner för att användaren enkelt ska kunna se på vädret utifrån olika kartparametrar.

 [**Weather map layers** @ openweathermap](http://openweathermap.org/api/maps)


