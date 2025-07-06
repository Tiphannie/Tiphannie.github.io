"use client";
import { useEffect, useState } from "react";
import mongoose from 'mongoose';
import { GetServerSideProps } from "next";


export type Dish = {
  _id: string;
  title: string;
  ingredients: string;
};
const DishSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
});

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/dishes"); // <--- ACHTUNG: richtige API verwenden
    const dishes = await res.json();

    return {
      props: {
        dishes: Array.isArray(dishes) ? dishes : [],
      },
    };
  } catch (error) {
    return {
      props: {
        dishes: [],
      },
    };
  }
};

/* const Dishes = mongoose.models.Dishes || mongoose.model('Dishes', DishSchema);

export const getStaticProps = async () => {
  // Connect to MongoDB (reuse your connection logic if possible)
  await mongoose.connect('mongodb://localhost:27017/myapp');

  const dishes = await Dishes.find().lean();

  return {
    props: {
      dishes: JSON.parse(JSON.stringify(dishes)), // remove mongoose document props
    },
    revalidate: 10,
  };
}; */
export default function EditStorePage({ dishes }: { dishes: Dish[] }) {
  const [dishList, setDishList] = useState<Dish[]>(dishes || []);

  // Form state
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ POST (neues Gericht hinzufügen)
  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  if (!title || !ingredients) {
    setError("Bitte fülle alle Felder aus.");
    setLoading(false);
    return;
  }

  try {
    const res = await fetch("/api/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, ingredients }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Fehler beim Hinzufügen");
    }

    const newDish = await res.json();
    setSuccess(`Gericht hinzugefügt: ${newDish.title}`);
    setTitle("");
    setIngredients("");
    setDishList((prev) => [...prev, newDish]);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}


  async function handleDelete(titleToDelete: string) {
  setError("");
  setSuccess("");

  try {
    const res = await fetch("/api/dishes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titleToDelete }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to delete dish");
    }

    setDishList((prev) => prev.filter((dish) => dish.title !== titleToDelete));
    setSuccess("Dish deleted successfully.");
  } catch (err: any) {
    setError(err.message);
  }
}

  
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
              //onChange={(e) => setFile(e.target.files?.[0] ?? null)}
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{dish.title}</strong>: {dish.ingredients}
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>

      <div
        style={{
          backgroundColor: "#DEDAD5",
          margin: "2rem auto",
          padding: "1rem",
          borderRadius: "10px",
          width: "60%",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
        <form onSubmit={handleSubmit}>
          <input
          placeholder="Titel"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
        />
          <input
          placeholder="Zutaten"
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
        />
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Hinzufügen
          </button>
        </form>
        <form  onClick={() => handleDelete(title)}>
          <input
          placeholder="Titel"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
        />
          <input
          placeholder="Zutaten"
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
        />
          <button
            type="submit"
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Löschen
          </button>
        </form>
          {/* <button
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(title)} // löscht anhand des eingegebenen Titels
          >
            Löschen
          </button> */}
        </div>
      </div>
    </div>
  );
}
