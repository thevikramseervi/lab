import React, { useState } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Saving...");
    const payload = {
      name,
      description: desc,
      price: parseFloat(price) || 0,
      inStock,
    };

    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create");
      const created = await res.json();
      setStatus("Created.");
      // clear inputs
      setName("");
      setDesc("");
      setPrice("");

      // Option A: emit an event (simple approach: dispatch custom event so ProductList can refetch)
      window.dispatchEvent(
        new CustomEvent("product:created", { detail: created })
      );

      // Option B: re-fetch from ProductList by letting user click refresh (we used event)
    } catch (err) {
      console.error(err);
      setStatus("Failed to create");
    } finally {
      setTimeout(() => setStatus(null), 2000);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <div>
        <label>Name</label>
        <br />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <br />
        <input value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <br />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          step="0.01"
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          In stock
        </label>
      </div>
      <button type="submit">Add</button>
      {status && <div>{status}</div>}
    </form>
  );
}
