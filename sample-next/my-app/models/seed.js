const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myapp");

const DishSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
});

const RestaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
});

const Dish = mongoose.model("Dish", DishSchema);
const Restaurant = mongoose.model("Restaurant", RestaurantSchema); // <-- hier definierst du das Modell

async function seed() {
  await Dish.deleteMany({});
  await Restaurant.deleteMany({}); // Modell heißt jetzt "Restaurant", nicht "Restaurants"

  await Dish.create([
    { title: "Veggi Döner", ingredients: "Döner mit Halloumi, Salat, Sauce" },
    { title: "Döner Tüte", ingredients: "Chipstüte mit Dönerfleisch, Sauce, Salat" },
  ]);

  await Restaurant.create([
    {
      id: 1,
      name: "ALLIM Döner Restaurant",
      description:
        "Klassisch Berliner Hack und Hänchen Döner mit frischen Zutaten und hausgemachten Soßen in Südberlin.",
    },
    {
      id: 2,
      name: "Mustafas Gemüse Kebab",
      description: "Miese Touri Falle und Mid Gemüse Döner",
    },
    {
      id: 3,
      name: "Hamdi Baba Restaurant",
      description: "Traditionell Berliner Hack Döner mit mehreren Filialen in Berlin.",
    },
  ]);

  console.log("Seed erfolgreich abgeschlossen.");
  mongoose.connection.close();
}

seed();
