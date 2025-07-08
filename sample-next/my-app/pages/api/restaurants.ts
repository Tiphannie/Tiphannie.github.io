import mongoose from "mongoose";

const RestaurantsSchema = new mongoose.Schema({
  id: Number,
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

export default async function handler(req: { body?: any; method?: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any[]): any; new(): any; }; end: { (arg0: string): any; new(): any; }; }; setHeader: (arg0: string, arg1: string[]) => void; }) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const restaurants = await Restaurant.find();
        return res.status(200).json(restaurants);
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    case "POST":
      try {
        const { id, name, description } = req.body;
        if (!id || !name || !description) {
          return res.status(400).json({ error: "Missing fields" });
        }
        const newRestaurant = new Restaurant({ id, name, description });
        await newRestaurant.save();
        return res.status(201).json(newRestaurant);
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

     case "DELETE":
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ error: "Missing restaurant id" });
        }

        const deleted = await Restaurant.findOneAndDelete({ id });

        if (!deleted) {
          return res.status(404).json({ error: "Restaurant not found" });
        }

        return res.status(200).json({ message: `Deleted restaurant with id ${id}` });
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
