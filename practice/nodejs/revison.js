const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  age: {
    type: Number,
    min: 18,
    max: 65,
    default: 18,
  },
  gender: {
    type: String,
    enum: ["male", "female", "non-binary"],
    default: "non-binary",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  preferences: {
    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "light",
    },
  },
  customField: {
    type: String,
    validate: {
      validator: (v) => v !== "forbidden",
      message: 'CustomField cannot be "forbidden"',
    },
  },
});

