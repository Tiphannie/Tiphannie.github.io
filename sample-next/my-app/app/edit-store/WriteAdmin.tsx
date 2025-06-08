"use client";
import { useState } from "react";

export default function WriteAdmin() {
  const [showTemplate, setShowTemplate] = useState(false);

  const data = {
    title: "Write Admin",
    list: [
      { name: "If images are not loading properly" },
      { name: "If there is a technical error on the page" },
      { name: "You can report a problem to the admin." },
    ],
  };

  return (
    <div>
      <div
        style={{
          width: "20%",
          backgroundColor: "#DEDAD5",
          margin: "5% auto 0",
          borderRadius: "15px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <button
          className="form-submit-btn"
          onClick={() => setShowTemplate(true)}
        >
          Write Admin
        </button>

        {showTemplate && (
          <div style={{ marginTop: "20px" }}>
            <h1>{data.title}</h1>
            <ol>
              {data.list.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ol>

            <br />

            <textarea
              required
              cols={40}
              rows={10}
              id="textarea"
              name="textarea"
              style={{ marginTop: "15px" }}
            />
            <br />
            <button type="submit" className="form-submit-btn" style={{ marginTop: "10px" }}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
