// connect mongodb: config/db.js
  const mongoose = require("mongoose");
  require("dotenv").config();

  const ConnecttoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connection to DB");
    } catch (error) {
      console.log("Error Occured in connect DB");
      console.log(error);
    }
  };

  module.exports = ConnecttoDB;

// server.js
  const express = require("express");
  const ConnecttoDB = require("./config/db");
  const AuthRouter = require("./routes/auth.route");
  const ResourceRouter = require("./routes/resource.route");
  const userRouter = require("./routes/user.route");
  const app = express();
  app.use(express.json());
  require("dotenv").config();

  app.use("/api/auth", AuthRouter);
  app.use("/api/resource", ResourceRouter);
  app.use("/api/user", userRouter);

  app.listen(3000, async () => {
    await ConnecttoDB();
    console.log("Server is runing 3000");
  });

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
      res.status(200).json({ message: "signup success", user: newUser });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });

  AuthRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Email" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }

      const payload = { user: { id: user.id } };
      const token = await jwt.sign(payload, process.env.JWT_SECRET);
      res.status(200).json({ message: "Login sucess", token });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  module.exports = AuthRouter;

// middleware

// auth middleware
  const protect = async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];

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

// role based access middleware
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

// productRoutes.js
// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");
// Route (Search + Filter + Sort + Pagination)

// GET /products?search=para&category=Medicine&minPrice=10&maxPrice=50

router.get("/", async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sort = "createdAt", // default sort field
      order = "desc", // default order
      page = 1, // default page
      limit = 10, // default limit
    } = req.query;

    // -----------------------
    // 1️⃣ BUILD QUERY OBJECT
    // -----------------------
    let queryObj={};

    // Search by product name
    if(search){
      queryObj.name={$regex:search,$options: "i" };
      // i = ignore case
    }

    // Filter by category
    if(category){
      queryObj.category=category;
    }

    // Filter by brand
    if(brand){
      queryObj.brand=brand;
    }

    // Price range filter
    if (minPrice || maxPrice){
      queryObj.price = {};
      if (minPrice) queryObj.price.$gte = Number(minPrice);
      if (maxPrice) queryObj.price.$lte = Number(maxPrice);
    }
    
    //Then queryObj becomes:
    // {
    //   name: { $regex: "para", $options: "i" },
    //   category: "Medicine",
    //   brand: "SomeBrand",
    //   price: { $gte: 10, $lte: 50 }
    // }

    // Meaning:
    // name should contain "para" (case insensitive)
    // category must be "Medicine"
    // price must be greater than or equal to 10
    // AND less than or equal to 50

    let sortObj = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    // Example query:
    // GET /products?sort=price&order=asc
    // Then:
    // sortObj = {
    //   price: 1     // 1=ascending (low → high)
    // }
    // If user sends order=desc:
    // sortObj = {
    //   price: -1  //-1=descending (high → low)
    // }
    

    const skip=(page-1)*limit;

    // Formula:
    // skip = (page - 1) * limit
    // Example:
    // page = 3
    // limit = 10
    // Then:
    // skip = (3 - 1) * 10 = 20
    // Meaning → skip first 20 items and show next 10 items.

    // This is how pagination works.
    // -----------------------
    // 4️⃣ EXECUTE QUERY
    // -----------------------
    const products = await Product.find(queryObj)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    // COUNT FOR PAGINATION UI
    const total = await Product.countDocuments(queryObj);
    // total = 47 eg
    // -----------------------
    // 5️⃣ RESPONSE
    // -----------------------
    res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = router;

// LOGGER MIDDLEWARE

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}--${new Date().toLocaleString()}`);

  next();
  // next() allows the request to move forward to next middleware / route.
};
// GET /products -- 29/11/2025, 10:45:12 AM
// POST /login -- 29/11/2025, 10:46:00 AM
// DELETE /user/12 -- 29/11/2025, 10:47:25 AM
module.exports = logger;

// Server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json()); // parse JSON body
app.use(cors());
const logger = require("./middleware/logger");
console.log(process.env.PORT);

// Apply middleware globally (runs for every request)
app.use(logger);

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("*", (req, res) => {
  res.status(404).send("Route Not Found");
});

app.listen(5000, () => console.log("Server running on port 5000"));

const mongoose = require("mongoose");

// STEP 1: Schema structure (like table columns)
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // product name must be provided
    },
    category: {
      type: String,
      required: true, // example: Medicine, Electronics, etc.
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true, // price is compulsory
    },
    description: {
      type: String,
      default: "",
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB ID
      ref: "User", // Reference to User Model
    },
  },
  { timestamps: true }
  // timestamps = createdAt & updatedAt automatic
);

// STEP 2: Create model and export
module.exports = mongoose.model("Product", productSchema);


// HTTP, 
  //  or Hypertext Transfer Protocol, is the foundation for data communication on the World Wide Web, used for exchanging data between a client (like a web browser) and a server.


// 16. What is Helmet?

  // Security middleware.

  // const helmet = require("helmet");
  // app.use(helmet());

  // Follow-up:

  // Why need security middleware?
  // → Prevent XSS, injection.


//17. What is Morgan?
  // Logger middleware.

  // app.use(require("morgan")("dev"));

  // Follow-up:

  // Which logs does Morgan show?
  // → Method, status, time.


  