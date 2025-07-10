const express = require("express");
const Redis = require("ioredis");
const connecttoDB = require("./config/db");
const postModel = require("./models/post.model");
const app = express();
app.use(express.json());

const redis = new Redis();


const CACHE_KEY = "items:all";
const CACHE_TTL = 60;

app.get("/items", async (req, res) => {
  try {
    const cacheResult = await redis.get(CACHE_KEY);
    if (cacheResult) {
      console.log("Cache hit");
      return res.json(JSON.parse(cacheResult));
    }
    console.log("Cache miss - Fetching from MongoDB");
    const items = await postModel.find();
    await redis.set(CACHE_KEY, JSON.stringify(items), "EX", CACHE_TTL);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/items", async (req, res) => {
  try {
    const { name,description } = req.body;
    const newItem = new postModel({ name,description });
    await newItem.save();
    await redis.del(CACHE_KEY);
    console.log("Cache invalidated (POST)");
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name ,description} = req.body;
    const updatedItem = await postModel.findByIdAndUpdate(id, { name ,description}, { new: true });
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    await redis.del(CACHE_KEY);
    console.log("Cache invalidated (PUT)");
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await postModel.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });
    await redis.del(CACHE_KEY);
    console.log("Cache invalidated (DELETE)");
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(3000, async() => {
    await connecttoDB();
    console.log(`Server running on port ${3000}`)
});
