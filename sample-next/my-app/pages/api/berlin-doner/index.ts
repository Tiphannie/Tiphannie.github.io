// pages/api/berlin-doner/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
};

// Define Schema and Model for DishPrice
const MenuPriceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const MenuPrice = mongoose.models.DishPrice || mongoose.model('DishPrice', MenuPriceSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const menuItems = await MenuPrice.find().lean();
        return res.status(200).json(menuItems);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch menu items' });
      }

    case 'POST':
      try {
        const { name, price } = req.body;
        if (!name || !price) {
          return res.status(400).json({ error: 'Name and price are required' });
        }
        const newItem = new MenuPrice({ name, price });
        await newItem.save();
        return res.status(201).json(newItem);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to create menu item' });
      }

    case 'DELETE':
      try {
        const { id, title } = req.body;
        if (!id && !title) {
          return res.status(400).json({ error: 'Provide id or title to delete' });
        }
        const deletedItem = id
          ? await MenuPrice.findByIdAndDelete(id)
          : await MenuPrice.findOneAndDelete({ name: title });
        if (!deletedItem) {
          return res.status(404).json({ error: 'Menu item not found' });
        }
        return res.status(200).json({ message: 'Menu item deleted', deletedItem });
      } catch (error) {
        return res.status(500).json({ error: 'Failed to delete menu item' });
      }

    case 'PATCH':
      try {
        const { id, name, price } = req.body;
        if (!id) {
          return res.status(400).json({ error: 'ID is required for updating' });
        }
        const updatedFields: any = {};
        if (name) updatedFields.name = name;
        if (price) updatedFields.price = price;

        const updatedItem = await MenuPrice.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedItem) {
          return res.status(404).json({ error: 'Menu item not found' });
        }
        return res.status(200).json(updatedItem);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to update menu item' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PATCH']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
