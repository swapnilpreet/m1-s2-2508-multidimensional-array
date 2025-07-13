import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.compare = function (pw) {
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model("User", userSchema);
