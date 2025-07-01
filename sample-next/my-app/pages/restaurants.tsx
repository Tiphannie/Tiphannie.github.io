// pages/restaurants.tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { GetStaticProps } from 'next';

type Restaurant = {
  id: string;
  name: string;
  description: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'src','restaurants.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const restaurants: Restaurant[] = JSON.parse(jsonData);
  return { props: { restaurants } };
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