const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myapp");

const RestaurantsSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
});

const Restauramts = mongoose.model("Restaurants", RestaurantsSchema);

Restauramts.find().then((Restauramts) => {
  console.log("Alle Restaurants:");
  console.log(Restauramts);
  mongoose.connection.close();
});
