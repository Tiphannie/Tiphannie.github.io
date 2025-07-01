const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myapp");

const MenuSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Menu = mongoose.model("DishPrice", MenuSchema);

Menu.find().then((Dishprice) => {
  console.log("Alle Gerichte + Preis:");
  console.log(Dishprice);
  mongoose.connection.close();
});
