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


// const express = require('express');
// const router = express.Router();
// const Movie = require('../models/Movie');
// const User = require('../models/User');

// // /analytics endpoint for generating reports
// router.get('/analytics', async (req, res) => {
//     try {
//         // Step 1: Average Rating by Genre
//         const avgRatingByGenre = await Movie.aggregate([
//             { $group: { _id: "$genre", averageRating: { $avg: "$rating" } } },
//             { $sort: { averageRating: -1 } }
//         ]);

//         // Step 2: Movies Released Per Year
//         const moviesByYear = await Movie.aggregate([
//             { $group: { _id: "$year", count: { $sum: 1 } } },
//             { $sort: { _id: 1 } }
//         ]);

//         // Step 3: Top-Rated Movies
//         const topRatedMovies = await Movie.aggregate([
//             { $sort: { rating: -1 } },
//             { $limit: 5 },
//             { $project: { title: 1, rating: 1, genre: 1, _id: 0 } }
//         ]);

//         // Step 4: Number of Users with Favorite Movies
//         const usersWithFavorites = await User.aggregate([
//             { $match: { favoriteMovies: { $exists: true, $ne: [] } } },
//             { $count: "totalUsersWithFavorites" }
//         ]);

//         res.json({
//             avgRatingByGenre,
//             moviesByYear,
//             topRatedMovies,
//             usersWithFavorites: usersWithFavorites[0]?.totalUsersWithFavorites || 0
//         });
//     } catch (error) {
//         console.error("Error generating analytics report:", error);
//         res.status(500).send("Error generating analytics report");
//     }
// });

// module.exports = router;