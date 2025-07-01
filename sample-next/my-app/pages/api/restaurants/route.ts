import { NextResponse } from "next/server";
import mongoose from "mongoose";

const RestaurantsSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
});

const Restaurant = mongoose.models.Dish || mongoose.model("Restaurant", RestaurantsSchema);

export async function GET() {
  await mongoose.connect("mongodb://localhost:27018/myapp");
  const dishes = await Restaurant.find();
  return NextResponse.json(dishes);
}