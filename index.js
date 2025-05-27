const express = require("express");
const exphbs = require('express-handlebars');
const server = express();
const port = 3002;
server.engine('handlebars', exphbs.engine({
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/public_html/views/layouts', 
  partialsDir: __dirname + '/public_html/views/layouts'
}));

server.set('view engine', 'handlebars');
server.set('views', __dirname + '/public_html/views');

server.use(express.static('public_html'));

server.get("/", function (req, res) {
    res.send( `
    <h1>Welcome to the homepage!</h1>
    <p><a href="/hello">Go to /hello</a></p>
    <p><a href="/search">Go to /search</a></p>
    `);
});

server.get("/hello", function (req, res) {
  res.send("Hello IMIs!");
});

server.get('/search', (req, res) => {
  res.render('home', {
    title: 'Spot-A-Doner',
    items: ['Doner 1', 'Doner 2', 'Doner 3'],
    mapData: 'Google Maps API script or div'
  });
});
server.listen(port, function () {
    console.log("Express listening on " + port);
});


