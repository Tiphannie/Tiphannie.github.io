import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";


const RestaurantsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
});

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantsSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://localhost:27017/myapp");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API /api/restaurants hit with method:", req.method);
  await connectDB();

  switch (req.method) {
    case "GET": {
      const restaurants = await Restaurant.find();
      return res.status(200).json(restaurants);
    }
    case "POST": {
      const { id, name, description } = req.body;
      const newRestaurant = new Restaurant({ id, name, description });
      await newRestaurant.save();
      return res.status(201).json(newRestaurant);
    }
    default: {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
