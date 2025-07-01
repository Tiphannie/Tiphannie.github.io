import { NextResponse } from "next/server";
import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
});

const Dish = mongoose.models.Dish || mongoose.model("Dish", DishSchema);

export async function GET() {
  await mongoose.connect("mongodb://localhost:27017/myapp");
  const dishes = await Dish.find();
  return NextResponse.json(dishes);
}
