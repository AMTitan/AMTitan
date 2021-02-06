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

var body1;

var promises = [];
const promise1 = new Promise((resolve) => {
  request("http://api.openweathermap.org/data/2.5/weather?zip=30004&units=metric&appid=8333920da3e5cd15901dca62f2b8d0f6", function (err, response, body) {
      fs.writeFileSync("Weather.json", body);
      body1 = body;
      resolve();
  })
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
var nasa;
const promise4 = new Promise((resolve) => {
  request("https://api.nasa.gov/planetary/apod?api_key=kN4Q4qJ9mhQ1de2J8xH2u7DOz2ZI5NTOeBZzm9ol", function (err, response, body) {
    fs.writeFileSync("nasa.json", body);
    nasa = body;
    resolve();
  })
})
promises.push(promise4);
var pinned;
const promise5 = new Promise((resolve) => {
  request("https://gh-pinned-repos-5l2i19um3.vercel.app/?username=AMTitan", function (err, response, body) {
    fs.writeFileSync("pinned.json", body);
    pinned = body;
    resolve();
  })
})
promises.push(promise5);
Promise.all(promises).then(() => {
  let rawdata = fs.readFileSync('Weather.json');
  body1 = JSON.parse(rawdata);
  let rawdata1 = fs.readFileSync('dogs.json');
  dogs = JSON.parse(rawdata1);
  let rawdata2 = fs.readFileSync('joke.json');
  joke = JSON.parse(rawdata2);
  let rawdata3 = fs.readFileSync('nasa.json');
  nasa = JSON.parse(rawdata3);
  let rawdata4 = fs.readFileSync('pinned.json');
  pinned = JSON.parse(rawdata4);

  console.log(JSON.parse(rawdata4));

  let DATA = {
    name: 'Arthur Melton',
    img: dogs,
    joke: joke,
    body: body1,
    nasa: nasa,
    pinned1: pinned[0],
    pinned2: pinned[1],
    pinned3: pinned[2],
    pinned4: pinned[3],
    pinned5: pinned[4],
    pinned6: pinned[5],
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
    if (DATA.pinned1 == null) {
      fs.readFile("main0.mustache", (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
      });
    }
    else if (DATA.pinned2 == null) {
      fs.readFile("main1.mustache", (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
      });
    }
    else if (DATA.pinned3 == null) {
      fs.readFile("main2.mustache", (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
      });
    }
    else if (DATA.pinned4 == null) {
      fs.readFile("main3.mustache", (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
      });
    }
    else if (DATA.pinned5 == null) {
      fs.readFile("main4.mustache", (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
      });
    }
    else if (DATA.pinned6.owner == null) {
      fs.readFile("main5.mustache", (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
      });
    }
    else {
      fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
      });
    }
  }
  generateReadMe();
});

