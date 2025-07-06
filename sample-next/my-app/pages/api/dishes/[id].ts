// pages/api/dishes/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
});

const Dish = mongoose.models.Dish || mongoose.model("Dish", DishSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://localhost:27017/myapp");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      const dish = await Dish.findById(id);
      if (!dish) return res.status(404).json({ error: "Dish not found" });
      return res.status(200).json(dish);

    case "PUT":
      const { title, ingredients } = req.body;
      const updatedDish = await Dish.findByIdAndUpdate(
        id,
        { title, ingredients },
        { new: true }
      );
      if (!updatedDish) return res.status(404).json({ error: "Dish not found" });
      return res.status(200).json(updatedDish);

    case "DELETE":
      const deleted = await Dish.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: "Dish not found" });
      return res.status(204).end();

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
