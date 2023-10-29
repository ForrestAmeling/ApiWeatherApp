$(document).ready(function () {
  // Global variables
  var city;
  var countryCode;
  var zip;
  var regionName;
  var brImg;
  var temp;
  var kelvin;
  var tempMax;
  var tempMin;
  var high;
  var low;
  var unitLetter;
  var weatherType;
  var description;
  var windspeed;
  var iconStr;
  var iconImg;
  var windDir;

  console.log("22");

  // Grabs location using API and longitude and latitude
  $.getJSON("https://ipapi.co/json/", function (data) {
    city = data.city;
    countryCode = data.country_code;
    zip = data.postal;
    regionName = data.region;
    console.log("29");

    // API courtesy of openweathermap.org
    var apiKey = "3b40b5b9db716aef50a59848f076442b";
    var api =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "," +
      countryCode +
      "&appid=" +
      apiKey;

    console.log(api);
    console.log("38");

    // Takes the data from the API and assigns it to variables
    $.getJSON(api, function (dataTwo) {
      weatherType = dataTwo.weather[0].main;
      kelvin = dataTwo.main.temp;
      windspeed = dataTwo.wind.speed;
      humidity = dataTwo.main.humidity;
      tempMax = dataTwo.main.temp_max;
      tempMin = dataTwo.main.temp_min;
      brImg = dataTwo.weather[0].main;
      description = dataTwo.weather[0].description;
      iconStr = dataTwo.weather[0].icon;
      iconImg = "http://openweathermap.org/img/w/" + iconStr + ".png";

      // Take the deg and convert it to a compass direction
      var deg = dataTwo.wind.deg;
      windDir = getCardinal(deg);

      function getCardinal(deg) {
        var directions = 8;
        var degree = 360 / directions;
        deg = deg + degree / 2;
        console.log("60");

        if (deg >= 0 * degree && deg < 1 * degree) return "N";
        if (deg >= 1 * degree && deg < 2 * degree) return "NE";
        if (deg >= 2 * degree && deg < 3 * degree) return "E";
        if (deg >= 3 * degree && deg < 4 * degree) return "SE";
        if (deg >= 4 * degree && deg < 5 * degree) return "S";
        if (deg >= 5 * degree && deg < 6 * degree) return "SW";
        if (deg >= 6 * degree && deg < 7 * degree) return "W";
        if (deg >= 7 * degree && deg < 8 * degree) return "NW";
        // Should never happen:
        return "N";
      }
      console.log("72");

      // Determine Fahrenheit or Celsius based on countryCode and convert temperature in Kelvin
      // to Fahrenheit or Celsius
      var usCountries = ["US", "BS", "BZ", "KY", "PL"];
      unitLetter = usCountries.includes(countryCode) ? "°F" : "°C";

      if (unitLetter === "°F") {
        temp = (kelvin * (9 / 5) - 459.67).toFixed(1);
        high = (tempMax * (9 / 5) - 459.67).toFixed(1);
        low = (tempMin * (9 / 5) - 459.67).toFixed(1);
      } else {
        temp = (kelvin - 273.15).toFixed(1);
        high = (tempMax - 273.15).toFixed(1);
        low = (tempMin - 273.15).toFixed(1);
      }

      // Assign variables to HTML elements
      $("#city").text(city + ", " + regionName);
      $("#zip").text(zip + ", " + countryCode);
      $("#weatherType").text(weatherType);
      $("#temp").text(temp + unitLetter);
      $("#high").text(high + unitLetter);
      $("#low").text(low + unitLetter);
      $("#windspeed").text(windspeed + "m/s");
      $("#deg").text(deg);
      $("#humidity").text(humidity + "%");
      $("#description").text(description);
      $("#icon").html('<img src="' + iconImg + '">');
      $("#windDir").text(windDir);
      console.log("100");

      // Change background photo based on weather type
      if (brImg !== undefined) {
        $("body")
          .removeClass(
            "backgroundClear backgroundClouds backgroundDrizzle backgroundRain backgroundThunderstorm backgroundSnow backgroundAtmosphere backgroundExtreme backgroundAdditional backgroundDef"
          )
          .addClass("background" + brImg);
      } else {
        $("body")
          .removeClass(
            "background01n background02n background09n background10n background11n background13n backgroundDef"
          )
          .addClass("backgroundDef");
      }
    });
  });
});

