import { NextRequest, NextResponse } from "next/server";
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

// GET /api/restaurants/:id — get one restaurant by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const restaurant = await Restaurant.findOne({ id: params.id });
  if (!restaurant) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }
  return NextResponse.json(restaurant);
}

// PUT /api/restaurants/:id — update a restaurant by id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { name, description } = await req.json();

  const updatedRestaurant = await Restaurant.findOneAndUpdate(
    { id: params.id },
    { name, description },
    { new: true }
  );

  if (!updatedRestaurant) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }

  return NextResponse.json(updatedRestaurant);
}

// DELETE /api/restaurants/:id — delete a restaurant by id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const deleted = await Restaurant.findOneAndDelete({ id: params.id });
  if (!deleted) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 }); // No content
}
