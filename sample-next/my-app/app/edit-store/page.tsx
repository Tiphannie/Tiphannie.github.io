"use client";
import { useState } from "react";
import WriteAdmin from "./WriteAdmin";

export default function EditStorePage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div style={{ backgroundColor: "#252525", minHeight: "100vh", padding: "2rem" }}>
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
          <h1 style={{ marginLeft: "20px" }}>Doner owner</h1>
        </div>
      </div>

      <br />
      <br />

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
        <h2>Edit your store</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Submitted!");
          }}
        >
          <label>Name:</label>
          <input type="text" style={{ width: "80%" }} required />

          <br />
          <label>Ingredients:</label>
          <textarea style={{ width: "85%", height: "80px" }} required />

          <br />
          <label className="custum-file-upload2">
            <span>Click to upload an image or video</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              style={{ display: "none" }}
            />
          </label>

          <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <WriteAdmin />
      </div>
    </div>
  );
}
