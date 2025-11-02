// run: node db-native.js
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB (native driver)");
    const db = client.db("shop");
    const products = db.collection("products");

    // Insert a document
    const insertResult = await products.insertOne({
      name: "Native Driver Sample",
      description: "Inserted with native driver",
      price: 9.99,
      inStock: true,
      createdAt: new Date(),
    });
    console.log("Inserted id:", insertResult.insertedId);

    // Find documents
    const found = await products.find({}).limit(5).toArray();
    console.log("Found", found.length, "products");

    // Update one
    const idToUpdate = insertResult.insertedId;
    await products.updateOne({ _id: idToUpdate }, { $set: { price: 7.99 } });
    console.log("Updated price for id", idToUpdate.toHexString());

    // Delete one
    await products.deleteOne({ _id: idToUpdate });
    console.log("Deleted doc", idToUpdate.toHexString());
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
