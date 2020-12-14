const express = require('express');
const axios = require("axios").default;

const app = express();
const  port = 3000;

//Middleware
app.set('view engine', "ejs");


//Routes

//root route

// root route
app.get('/', function (req, res) {
    res.render('index', {});
});

// ticker data route
app.get('/ticker-data/:symbol', function (req, res) {
  // console.log(req.params.symbol);
  let symbol = req.params.symbol;


  var options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: {symbol: symbol, interval: '1day', outputsize: '30', format: 'json'},
    headers: {
      'x-rapidapi-key': '30b20b11demshf65fd60638895c6p17e8ccjsn0b391d09b80f',
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    // console.log(response.data.meta);
    // console.log(response.data.values);
    let ticker_info = response.data.meta;
    let ticker_data = response.data.values;

    res.render('show', {ticker: ticker_info, data: ticker_data});
  }).catch(function (error) {
    console.error(error);
  });
});


app.listen(port, function () {
    console.log("server is live on port:" + port)
});