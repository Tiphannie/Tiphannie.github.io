import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

// Schema & Modell
const DishSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
});
const Dish = mongoose.models.Dish || mongoose.model("Dish", DishSchema);

// Verbindung
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://localhost:27017/myapp", {
      dbName: "myapp",
    });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case "GET": {
      const dishes = await Dish.find();
      return res.status(200).json(dishes);
    }

    case "POST": {
      const { title: postTitle, ingredients } = req.body;
      if (!postTitle || !ingredients) {
        return res.status(400).json({ error: "Missing title or ingredients" });
      }

      const newDish = new Dish({ title: postTitle, ingredients });
      await newDish.save();
      return res.status(201).json(newDish);
    }

    case "DELETE": {
      const { title: deleteTitle } = req.body;
      if (!deleteTitle) {
        return res.status(400).json({ error: "Missing title" });
      }

      const deleted = await Dish.findOneAndDelete({ title: deleteTitle });
      if (!deleted) {
        return res.status(404).json({ error: "Dish not found" });
      }

      return res.status(200).json({ message: `Deleted dish: ${deleteTitle}` });
    }

    default: {
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
