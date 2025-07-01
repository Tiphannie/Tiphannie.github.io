const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27018/myapp");

const DishSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
});

const Dish = mongoose.model("Dish", DishSchema);

async function seed() {
  await Dish.deleteMany({});

  await Dish.create([
    { title: "Veggi Döner", ingredients: "Döner mit Halloumi, Salat, Sauce" },
    { title: "Döner Tüte", ingredients: "Chipstüte mit Dönerfleisch, Sauce, Salat" },
  ]);

  await Restaurants.deleteMany({});

  await Restaurants.create([
    {
      "id": "1",
      "name": "ALLIM Döner Restaurant",
      "description": "Klassisch Berliner Hack und Hänchen Döner mit frischen Zutaten und hausgemachten Soßen in Südberlin."
    },
    {
      "id": "2",
      "name": "Mustafas Gemüse Kebab",
      "description": "Miese Touri Falle und Mid Gemüse Döner"
    },
    {
      "id": "3",
      "name": "Hamdi Baba Restaurant",
      "description": "Traditionell Berliner Hack Döner mit mehreren Filialen in Berlin."
    }
  ]);

  console.log("Seed erfolgreich abgeschlossen.");
  mongoose.connection.close();
}

seed();
