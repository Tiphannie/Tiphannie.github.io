// pages/rate/[id].tsx
import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';

type Restaurant = {
  id: string;
  name: string;
  description: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(),'src', 'data', 'restaurants.json');
  const restaurants = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const paths = restaurants.map((r: Restaurant) => ({
    params: { id: r.id }
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'src', 'data', 'restaurants.json');
  const restaurants = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const restaurant = restaurants.find((r: Restaurant) => r.id === params?.id);
  return { props: { restaurant } };
};

export default function RatePage({ restaurant }: { restaurant: Restaurant }) {
  const categories = ['Gesamt', 'Brot', 'Soße', 'Fleisch', 'Salat'];

  return (
    <div style={{ display: 'flex' }}>
      <div className="main-container">
        <div className="header">
          <div className="header-title">Bewerte "{restaurant.name}"</div>
          <div className="account-icon">👤</div>
        </div>

        <div className="content">
          {categories.map((label) => (
            <div className="rating-category" key={label}>
              <span>{label}:</span>
              <span className="stars">★★★★★</span>
            </div>
          ))}

          <div className="comment-section">
            <form method="POST" action="#">
              <label htmlFor="comment"><strong>Kommentar:</strong></label>
              <textarea id="comment" placeholder="Schreib deinen Eindruck hier rein..." />
              <button className="submit-btn" type="submit">Absenden</button>
            </form>
          </div>
        </div>
      </div>

      <div className="sidebar">
        <h3>Menü</h3>
        <ul>
          <li>Start</li>
          <li>Bewerten</li>
          <li>Meine Bewertungen</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
}
