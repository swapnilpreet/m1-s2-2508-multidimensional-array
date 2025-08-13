const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");

const app = express();
app.use(express.json());

const connectoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/surveyDB");
    console.log("Connecting to DB");
  } catch (error) {
    console.log("Error Occured in connecting -Db");
    console.log(error);
  }
};

connectoDB();

app.post("/user", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new UserModel({ name, email, age });
    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a User
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a User
app.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Users with Sorting

app.get("/users", async (req, res) => {
  try {
    // Example: /users?sort=age&order=desc
    const sortField = req.query.sort || "name";
    const sortOrder = req.query.order === "desc" ? -1 : 1;
    const users = await UserModel.find().sort({ [sortField]: sortOrder });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(3000,()=>{
    console.log("surver runing on 3000...")
})