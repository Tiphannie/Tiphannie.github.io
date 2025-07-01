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

  console.log("Seed erfolgreich abgeschlossen.");
  mongoose.connection.close();
}

seed();
