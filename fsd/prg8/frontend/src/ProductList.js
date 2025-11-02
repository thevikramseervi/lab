import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // delete handler
  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((p) => p.filter((x) => x._id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Products</h2>
      {loading ? <p>Loading...</p> : null}
      {products.length === 0 && !loading ? <p>No products yet.</p> : null}
      <ul>
        {products.map((p) => (
          <li key={p._id} style={{ marginBottom: 8 }}>
            <strong>{p.name}</strong> — ₹{p.price}{" "}
            {p.inStock ? "(In stock)" : "(Out of stock)"}
            <div style={{ fontSize: 12 }}>{p.description}</div>
            <button
              onClick={() => handleDelete(p._id)}
              style={{ marginTop: 6 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={fetchProducts}>Refresh</button>
    </div>
  );
}
