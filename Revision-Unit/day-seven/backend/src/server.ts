import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Mongo connection error:", err));

interface IUser {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password ||password.length < 6) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(201).json({users});
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
