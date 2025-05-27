const express = require("express");
const server = express();
const port = 3002;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

server.get("/", function (req, res) {
    res.send( `
    <h1>Welcome to the homepage!</h1>
    <p><a href="/hello">Go to /hello</a></p>
    `);
});

server.get("/hello", function (req, res) {
  res.send("Hello IMIs!");
});

server.listen(port, function () {
    console.log("Express listening on " + port);
});

server.engine('handlebars', exphbs.engine({ defaultLayout: false }));
server.set('view engine', 'handlebars');
server.set('views', './views');

server.use(express.static('public_html'))

const restaurants = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'restaurants.json'), 'utf-8')
);

// Route to list restaurants
server.get('/restaurants', (req, res) => {
  res.render('restaurantList', { restaurants });
});

server.get('/rate/:restaurantId', (req, res) => {
  const restaurant = restaurants.find(r => r.id === req.params.restaurantId);
  if (!restaurant) return res.status(404).send('Restaurant not found');

  res.render('rate', {
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    categories: [
      { label: 'Gesamt' },
      { label: 'Brot' },
      { label: 'Soße' },
      { label: 'Fleisch' },
      { label: 'Salat' }
    ]
  });
});



