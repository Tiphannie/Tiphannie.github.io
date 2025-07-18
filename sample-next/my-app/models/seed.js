const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myapp");

const DishSchema = new mongoose.Schema({
  id: Number,
  title: String,
  ingredients: String,
});

const RestaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  dishes: [Number], 
});

const MenuPriceSchema = new mongoose.Schema({
  name: String,
  price : Number,
});

const Dish = mongoose.model("Dish", DishSchema);
const Restaurant = mongoose.model("Restaurant", RestaurantSchema); // <-- hier definierst du das Modell
const MenuPrice = mongoose.model("DishPrice", MenuPriceSchema); 

async function seed() {
  await Dish.deleteMany({});
  await Restaurant.deleteMany({}); // Modell heißt jetzt "Restaurant", nicht "Restaurants"
  await MenuPrice.deleteMany({});

  await Dish.create([
    { id: 1, title: "Veggi Döner", ingredients: "Döner mit Halloumi, Salat, Sauce" },
    { id: 2, title: "Döner Tüte", ingredients: "Chipstüte mit Dönerfleisch, Sauce, Salat" },
  ]);

  await Restaurant.create([
    {
      id: 1,
      name: "ALLIM Döner Restaurant",
      description:
        "Klassisch Berliner Hack und Hänchen Döner mit frischen Zutaten und hausgemachten Soßen in Südberlin.",
      dishes: [1],   
    },
    {
      id: 2,
      name: "Mustafas Gemüse Kebab",
      description: "Miese Touri Falle und Mid Gemüse Döner",
      dishes: [1],
    },
    {
      id: 3,
      name: "Hamdi Baba Restaurant",
      description: "Traditionell Berliner Hack Döner mit mehreren Filialen in Berlin.",
      dishes: [2],
    },
  ]);

  await MenuPrice.create([
    { name: "Döner Classic", price: 5.5 },
    { name: "Veggie Dürüm", price: 6 },
    { name: "Lahmacun Roll", price: 5 },
  ]);

  console.log("Seed erfolgreich abgeschlossen.");
  mongoose.connection.close();
}


seed();
