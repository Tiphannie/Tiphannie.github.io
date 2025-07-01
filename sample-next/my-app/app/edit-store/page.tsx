"use client";
import { useEffect, useState } from "react";

type Dish = {
  _id: string;
  title: string;
  ingredients: string;
};

export default function EditStorePage() {
  const [file, setFile] = useState<File | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    fetch("/api/dishes")
      .then((res) => res.json())
      .then((data) => setDishes(data));
  }, []);

  return (
    <div style={{ backgroundColor: "#252525", minHeight: "100vh", padding: "2rem", color: "black" }}>
      {/* Header */}
      <div
        style={{
          width: "80%",
          backgroundColor: "#DEDAD5",
          margin: "auto",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div style={{ width: "30%", display: "flex", justifyContent: "center" }}>
          <img
            src="https://original-berliner-doener.com/wp-content/uploads/2025/01/Logo-1-1024x1024.png"
            style={{ width: "50%" }}
            alt="Logo"
          />
        </div>
        <div style={{ width: "70%" }}>
          <h1 style={{ marginLeft: "20px" }}>Doner Owner Dashboard</h1>
        </div>
      </div>

      <br />

      {/* Formular */}
      <div
        style={{
          width: "40%",
          backgroundColor: "#DEDAD5",
          margin: "auto",
          borderRadius: "15px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>Neues Gericht hinzufügen</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Noch nicht implementiert");
          }}
        >
          <label>Name des Gerichts:</label>
          <input type="text" style={{ width: "80%" }} required />

          <br />
          <label>Zutaten:</label>
          <textarea style={{ width: "85%", height: "80px" }} required />

          <br />
          <label className="custum-file-upload2">
            <span>Bild hochladen</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              style={{ display: "none" }}
            />
          </label>

          <br />
          <button type="submit">Gericht speichern</button>
        </form>
      </div>

      <br />

      {/* Gerichte anzeigen */}
      <div
        style={{
          backgroundColor: "#DEDAD5",
          margin: "2rem auto",
          padding: "1rem",
          borderRadius: "10px",
          width: "60%",
        }}
      >
        <h2>Alle Gerichte</h2>
        <ul>
          {dishes.map((dish) => (
            <li key={dish._id} style={{ marginBottom: "1rem" }}>
              <strong>{dish.title}</strong>: {dish.ingredients}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
