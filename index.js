/* index.js  –  Express + Handlebars server */
import express from "express";
import path    from "node:path";
import { engine } from "express-handlebars";

const app  = express();
const port = process.env.PORT || 3002;

/* ─────────────────────────────────────────────────────────────
   1.  Configure Handlebars view engine
   ───────────────────────────────────────────────────────────*/
app.engine("hbs", engine({
  extname      : ".hbs",
  defaultLayout: "main",
  layoutsDir   : path.join(process.cwd(), "views", "layouts"),
  partialsDir  : path.join(process.cwd(), "views", "partials"),
  helpers: {
    /* helpers used by views/partials/stars.hbs */
    range: (from, to) =>
      Array.from({ length: to - from + 1 }, (_, i) => from + i),
    lte: (a, b) => a <= b
  }
}));
app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "views"));

/* ─────────────────────────────────────────────────────────────
   2.  Static assets (CSS, images, client JS)
   ───────────────────────────────────────────────────────────*/
app.use("/doc", express.static(path.join(process.cwd(), "public_html")));

/* ─────────────────────────────────────────────────────────────
   3.  Routes
   ───────────────────────────────────────────────────────────*/
app.get("/restaurants/:slug", (req, res) => {
  const restaurant = mockRestaurant(req.params.slug);   // dummy data for now
  res.render("restaurant", {
    pageTitle : restaurant.name,
    restaurant
  });
});

/* health check */
app.get("/hello", (_, res) => res.send("Hello!"));

/* ─────────────────────────────────────────────────────────────
   4.  Start the server
   ───────────────────────────────────────────────────────────*/
app.listen(port, () =>
  console.log(`Express + HBS listening on http://localhost:${port}`)
);

/* ─────────────────────────────────────────────────────────────
   helper: fake data source
   ───────────────────────────────────────────────────────────*/
function mockRestaurant(slug) {
  return {
    slug,
    name    : "Berlin Döner",
    rating  : 4.5,
    address : "Mehringdamm 32, 10961 Berlin-Kreuzberg",
    description: "Family-run kebab spot famous for its homemade sauces since 1998…",
    menu: [
      { name: "Döner Classic", price: 5.50 },
      { name: "Veggie Dürüm",  price: 6.00 },
      { name: "Lahmacun Roll", price: 5.00 }
    ],
    reviews: [
      { author: "Anna K.", rating: 5, text: "Best sauce in town!" },
      { author: "Jörg S.", rating: 4, text: "Long queue but worth it." }
    ],
    lat: 52.4994, lng: 13.3911,
    openNow: true
  };
}
