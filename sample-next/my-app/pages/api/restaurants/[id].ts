import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const RestaurantsSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
});

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantsSchema);

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
      try {
        const restaurant = await Restaurant.findOne({ id });
        if (!restaurant) {
          return res.status(404).json({ error: "Restaurant not found" });
        }
        return res.status(200).json(restaurant);
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    case "PUT":
      try {
        const { name, description } = req.body;
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
          { id },
          { name, description },
          { new: true }
        );
        if (!updatedRestaurant) {
          return res.status(404).json({ error: "Restaurant not found" });
        }
        return res.status(200).json(updatedRestaurant);
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    case "DELETE":
      try {
        const deleted = await Restaurant.findOneAndDelete({ id });
        if (!deleted) {
          return res.status(404).json({ error: "Restaurant not found" });
        }
        return res.status(204).end();
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}