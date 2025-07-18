import React from "react";
import Link from "next/link";
import type { Restaurant } from '../../restaurants';
import type { Dish } from "../../edit-store";
import { GetServerSideProps } from "next";

type Props = {
  restaurant?: Restaurant | null;
  dishes?: Dish[] | [];
  error?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.params as { id: string };

  try {
    // 1. Fetch the restaurant
    const res = await fetch(`http://localhost:3000/api/restaurants/${id}`);
    if (!res.ok) {
      return { props: { restaurant: null, error: "Restaurant not found" } };
    }

    const restaurant: Restaurant = await res.json();

    let dishes: Dish[] = [];

    // 2. Fetch dishes if they exist
    if (restaurant.dishes && restaurant.dishes.length > 0) {
      for (const dishId of restaurant.dishes) {
      const dishRes = await fetch(`http://localhost:3000/api/dishes/${dishId}`);
      if (dishRes.ok) {
        dishes.push(await dishRes.json());
      }
      }
      
    }

    return { props: { restaurant, dishes } };
  } catch (error: any) {
    return { props: { restaurant: null, error: error.message || "Error" } };
  }
};

export default function RestaurantPage({ restaurant, dishes, error }: Props) {
  // You can add delete logic here if needed, similar to before

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!restaurant) return <p>Kein Restaurant gefunden.</p>;

  return (
    <div style={{ display: "flex" }}>
      <div className="main-container">
        <div className="header">
          <div className="header-title">Döner Restaurant</div>
          <div className="account-icon">👤</div>
        </div>
        <div className="content">
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          {dishes && dishes.length > 0 && (
            <>
              <h3>Gerichte:</h3>
              <ul>
                {dishes.map((dish) => (
                  <li key={dish._id}>
                    <strong>{dish.title}</strong>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="sidebar">
        <h3>Menü</h3>
        <ul>
          <li>
            <Link href="/">Start</Link>
          </li>
          <li>
            <Link href="/restaurants">Bewerten</Link>
          </li>
          <li>Meine Bewertungen</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
}