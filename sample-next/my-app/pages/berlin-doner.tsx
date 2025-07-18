// pages/berlin-doner.tsx

import mongoose from 'mongoose';
import { GetServerSideProps } from 'next';

type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

// Define schema & model inline
const MenuPriceSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const MenuPrice = mongoose.models.DishPrice || mongoose.model('DishPrice', MenuPriceSchema);

export const getServerSideProps: GetServerSideProps = async () => {
  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/myapp');

  const menuItems = await MenuPrice.find().lean();
  console.log(menuItems); // add this temporarily
  return {
    props: {
      menuItems: JSON.parse(JSON.stringify(menuItems)),
    },
  };
};

export default function BerlinDonerPage({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Berlin Döner – Restaurant Profile</title>
      </head>

      <header>
        <h1>Berlin Döner</h1>
        <p className="stars">★★★★☆ 4.5 / 5</p>
        <address>Mehringdamm 32, 10961 Berlin-Kreuzberg</address>
      </header>

      <nav className="tabs">
        <a href="#about">About</a>
        <a href="#menu">Menu</a>
        <a href="#reviews">Reviews</a>
        <a href="#map">Map</a>
      </nav>

      <main>
        <section id="about">
          <h2>About</h2>
          <p>Family-run kebab spot famous for its homemade sauces since 1998…</p>
        </section>

        <section id="menu">
          <h2>Menu (from DB)</h2>
          <ul>
            {menuItems.map((item) => (
              <li key={item._id}>
                {item.name} – €{item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </section>

        <section id="reviews">
          <h2>Latest Reviews</h2>
          <article>
            <h3>“Best sauce in town” – Anna K.</h3>
            <p>★★★★★ Very friendly staff…</p>
          </article>
        </section>

        <section id="map">
          <h2>Find Us</h2>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?marker=52.4994,13.3911"
            loading="lazy"
            width="100%"
            height="300"
            title="Map"
          ></iframe>
        </section>
      </main>

      <footer>&copy; Spot-A-Dönner 2025</footer>
    </>
  );
}
