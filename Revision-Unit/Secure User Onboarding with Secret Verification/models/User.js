import mongoose from "mongoose";

export const SECRET_QUESTIONS = [
  "What is your favorite book?",
  "What street did you grow up on?",
  "Who was your childhood best friend?",
  "What is the name of your favorite teacher?",
  "What is your dream travel destination?",
  "What was your childhood nickname?",
  "What is the name of your favorite sports team?",
];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    secretQuestion: { type: String, required: true, enum: SECRET_QUESTIONS },
    secretAnswerHash: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
