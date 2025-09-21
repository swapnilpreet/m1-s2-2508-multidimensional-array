
// connect mongo

const mongoose=require('mongoose');
require('dotenv').config();

const ConnecttoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection to DB");
    } catch (error) {
        console.log("Error Occured in connect DB");
        console.log(error);
    }
}

module.exports=ConnecttoDB;


// server.js

const express=require('express');
const ConnecttoDB = require('./config/db');
const AuthRouter = require('./routes/auth.route');
const ResourceRouter = require('./routes/resource.route');
const userRouter = require('./routes/user.route');
const app=express();
app.use(express.json());
require('dotenv').config();


app.use('/api/auth',AuthRouter)
app.use('/api/resource',ResourceRouter)
app.use('/api/user',userRouter)

app.listen(3000,async()=>{
    await ConnecttoDB();
    console.log("Server is runing 3000");
})


// login signup
const express = require("express");
const AuthRouter = express.Router();
const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

AuthRouter.post("/register", async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Please enter username, email, and password" });
  }
  try {
    let userByUsername = await UserModel.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    let userByEmail = await UserModel.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const newUser = new UserModel({ username, email, password, role, profile });
    const salt = await bcrypt.genSalt(5);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.status(200).json({message:"signup success",user:newUser})
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields"});
  }
  try {
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({ msg: "Invalid password" });
    }
    
    const payload ={user:{id:user.id}};
    const token=await jwt.sign(payload,process.env.JWT_SECRET);
    res.status(200).json({message:"Login sucess",token})
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = AuthRouter;


// middleware

// auth

const protect = async (req, res, next) => {
  let token=req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};


// role based
function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    // Example: get user role from request (in real apps, use JWT/auth)
    const userRole = req.headers["role"]; // e.g., 'admin', 'user'

    if (!userRole) return res.status(401).json({ message: "Role not found" });

    if (!allowedRoles.includes(userRole))
      return res.status(403).json({ message: "Access denied" });

    next(); // role allowed
  };
}

module.exports = { roleMiddleware };




// CURD routes

const express = require("express");
const Product = require("../models/Product");
const { roleMiddleware } = require("../middlewares/auth");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new product (admin only)
router.post("/", roleMiddleware(["admin"]), async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update entire product (admin only)
router.put("/:id", roleMiddleware(["admin"]), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update partial product (admin only)
router.patch("/:id", roleMiddleware(["admin"]), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product (admin only)
router.delete("/:id", roleMiddleware(["admin"]), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example Aggregation: Get products grouped by category
router.get("/aggregation/groupByCategory", async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalProducts: { $sum: 1 },
          avgPrice: { $avg: "$price" },
        },
      },
      { $sort: { totalProducts: -1 } },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
