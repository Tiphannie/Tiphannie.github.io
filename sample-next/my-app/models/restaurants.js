const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27018/myapp");

const DishSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
});

const Dish = mongoose.model("Dish", DishSchema);

Dish.find().then((dishes) => {
  console.log("Alle Restaurants:");
  console.log(dishes);
  mongoose.connection.close();
});
