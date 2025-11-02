import React from "react";
import ProductList from "./ProductList.js";
import ProductForm from "./ProductForm.js";

function App() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Product Manager</h1>
      <ProductForm />
      <hr />
      <ProductList />
    </div>
  );
}

export default App;
