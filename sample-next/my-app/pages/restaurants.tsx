// pages/restaurants.tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import mongoose from 'mongoose';


type Restaurant = {
  id: string;
  name: string;
  description: string;
};

// reuse schema & model from your API or define here (make sure no model overwrite issues)
const RestaurantsSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
});

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantsSchema);

export const getStaticProps = async () => {
  // Connect to MongoDB (reuse your connection logic if possible)
  await mongoose.connect('mongodb://localhost:27017/myapp');

  const restaurants = await Restaurant.find().lean();

  return {
    props: {
      restaurants: JSON.parse(JSON.stringify(restaurants)), // remove mongoose document props
    },
    revalidate: 10,
  };
};

export default function RestaurantsPage({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <div style={{ display: 'flex' }}>
        <div className="main-container">
        <div className="header">
            <div className="header-title">Döner Restaurants</div>
            <div className="account-icon">👤</div>
        </div>

        <div className="content">
            <h2>Wähle ein Restaurant zum Bewerten</h2>
            <ul className="restaurant-list">
            {restaurants.map((r) => (
                <li key={r.id}>
                <Link href={`/rate/${r.id}`}>{r.name}</Link>
                <br />
                <small>{r.description}</small>
                </li>
            ))}
            </ul>
        </div>
        </div>


        <div className="sidebar">
            <h3>Menü</h3>
            <ul>
            <li><Link href="/">Start</Link></li>
            <li><Link href="/restaurants">Bewerten</Link></li>
            <li>Meine Bewertungen</li>
            <li>Logout</li>
            </ul>
        </div>
    </div>
  );
}