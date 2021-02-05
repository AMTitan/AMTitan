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

let url = 'http://api.openweathermap.org/data/2.5/weather?zip=30004&units=metric&appid=8333920da3e5cd15901dca62f2b8d0f6';

var body1;

var promises = [];
const promise1 = new Promise((resolve) => {
  request(url, function (err, response, body) {
    if (err) {
      console.log('error:', error);
    } else {
      console.log('body:', body);
      fs.writeFileSync("weather.json", body);
      body1 = body;
      resolve();
    }
  });
})
promises.push(promise1);
var dogs;
const promise2 = new Promise((resolve) => {
  request("https://dog.ceo/api/breeds/image/random", function (err, response, body) {
      fs.writeFileSync("dogs.json", body);
      dogs = body;
      resolve();
    })
})
promises.push(promise2);
var joke;
const promise3 = new Promise((resolve) => {
  request("https://geek-jokes.sameerkumar.website/api?format=json", function (err, response, body) {
    fs.writeFileSync("joke.json", body);
    joke = body;
    resolve();
  })
})
promises.push(promise3);
Promise.all(promises).then(() => {
  let rawdata = fs.readFileSync('Weather.json');
  body1 = JSON.parse(rawdata);
  let rawdata1 = fs.readFileSync('dogs.json');
  dogs = JSON.parse(rawdata1);
  let rawdata2 = fs.readFileSync('joke.json');
  joke = JSON.parse(rawdata2);

  console.log(body1);

  let DATA = {
    name: 'Arthur Melton',
    img: dogs,
    joke: joke,
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
});

