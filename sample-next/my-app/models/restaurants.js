const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27018/myapp");

const RestauramtsSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
});

const Restauramts = mongoose.model("Restaurants", RestauramtsSchema);

Restauramts.find().then((Restauramts) => {
  console.log("Alle Restaurants:");
  console.log(Restauramts);
  mongoose.connection.close();
});
