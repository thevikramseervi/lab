require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productsRouter = require("./routes/products");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // parse JSON bodies

// mount routes
app.use("/products", productsRouter);

// connect mongoose
async function start() {
  try {
      await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("**************** MONGO_URI:********************\n", process.env.MONGO_URI);
        console.log("Connected to MongoDB via Mongoose");


    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}
start();
