// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/
const request = require('request');

let apiKey = '8333920da3e5cd15901dca62f2b8d0f6';
let city = '30004';
let url = `http://api.openweathermap.org/data/2.5/weather?zip=${city}&units=metric&appid=${apiKey}`

let rawdata = fs.readFileSync('weather.json');
let body1 = JSON.parse(rawdata);

fs.readFile("weather.json", JSON, function (err,data) {
  if (err) {
    return console.log(err);
  }
  body1 = data;
});

let DATA = {
  name: 'Arthur Melton',
  body: body1,
  FerTem: Math.round((body1.main.temp * 1.8 + 32) * 100) / 100,
  FerFel: Math.round((body1.main.feels_like * 1.8 + 32) * 100) / 100,
  Des: body1.weather[0].description,
  icon: body1.weather[0].icon,
  SunRise: new Date(body1.sys.sunrise * 1000).toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York',
  }),
  SunSet: new Date(body1.sys.sunset * 1000).toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York',
  }),
  WSmph: Math.round((body1.wind.speed * 2.236936) * 100) / 100,
  date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'America/New_York',
  }),
};

/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}
generateReadMe();