import React, { useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import type { Dish } from "./edit-store";
export type Restaurant = {
  id: string;
  name: string;
  description: string;
  dishes?: Dish[]; // Optional dishes array
};

// This function runs on the server at request time
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/restaurants");
    const restaurants = await res.json();

    return {
      props: {
        restaurants: Array.isArray(restaurants) ? restaurants : [],
      },
    };
  } catch (error) {
    return {
      props: {
        restaurants: [],
      },
    };
  }
};

export default function RestaurantsPage({ restaurants: initialRestaurants }: { restaurants?: Restaurant[] }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants || []);

  // Form state
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!id || !name || !description) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add restaurant");
      }

      const newRestaurant = await res.json();

      setSuccess(`Added restaurant: ${newRestaurant.name}`);
      setId("");
      setName("");
      setDescription("");
      setLoading(false);

      // location.reload();
      setRestaurants((prev) => [...prev, newRestaurant]);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }
  //Delete handler
  async function handleDelete(idToDelete: string) {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/restaurants", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: idToDelete }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete restaurant");
      }

      // Remove deleted restaurant from state to update UI
      setRestaurants(restaurants.filter(r => r.id !== idToDelete));
      setSuccess("Restaurant deleted successfully.");
    } catch (err: any) {
      setError(err.message);
    }
  }

   return (
    <div style={{ display: "flex" }}>
      <div className="main-container">
        <div className="header">
          <div className="header-title">Döner Restaurants</div>
          <div className="account-icon">👤</div>
        </div>

        <div className="content">
          <h2>Wähle ein Restaurant zum Bewerten</h2>
          <ul className="restaurant-list">
            {restaurants.map((r) => (
              <li key={r.id} style={{ marginBottom: "1rem" }}>
                <Link href={`/ratings/rate/${r.id}`}>
                  <strong>{r.name}</strong>
                </Link>
                <br />
                <small>{r.description}</small>
                <br />
                {/* Delete button */}
                <button
                  style={{ marginTop: "0.5rem", color: "red" }}
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <hr />

          <h3>Neues Restaurant hinzufügen</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">ID:</label> <br />
              <input
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="name">Name:</label> <br />
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="description">Beschreibung:</label> <br />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Speichern..." : "Hinzufügen"}
            </button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
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