
// 🔹 1. What is a MongoDB Session?
        // A session in MongoDB is a context for performing multiple operations as a single transaction.

        // Using a session ensures atomicity: either all operations succeed or all fail.

        // Useful when you need multiple collections updated together safely (like banking apps).

// 🔹 2. When to Use Sessions
    // Money transfer: deduct from one account, add to another → both must succeed.
    // Inventory + order creation: create order & reduce stock simultaneously.
    // Any multi-document operations that must be consistent.


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  wallet: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

async function transferMoney(senderId, receiverId, amount) {
  const session = await mongoose.startSession(); // start session
  session.startTransaction(); // start transaction

  try {
    // 1️⃣ Deduct from sender
    const sender = await User.findById(senderId).session(session);
    if (!sender) throw new Error("Sender not found");
    if (sender.wallet < amount) throw new Error("Insufficient balance");
    sender.wallet -= amount;
    await sender.save({ session });

    // 2️⃣ Add to receiver
    const receiver = await User.findById(receiverId).session(session);
    if (!receiver) throw new Error("Receiver not found");
    receiver.wallet += amount;
    await receiver.save({ session });

    // 3️⃣ Commit transaction
    await session.commitTransaction();
    console.log("Transaction successful!");
  } catch (err) {
    // Rollback on error
    await session.abortTransaction();
    console.error("Transaction failed:", err.message);
  } finally {
    session.endSession(); // End session
  }
}

// -------------------- Connect to MongoDB --------------------
mongoose
  .connect("mongodb://localhost:27017/sessionDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB connected");

    // Example usage
    await transferMoney("64f123abc12345a123456789", "64f123abc12345a123456788", 100);
    process.exit(0);
  })
  .catch((err) => console.log(err));




//   🔹 1. const session = await mongoose.startSession();

// What it is:
// This creates a session object in MongoDB using Mongoose.

// Purpose:

// A session acts as a context to perform multiple operations as a single atomic transaction.

// Any operations executed with this session can later be committed or rolled back.

// Example:

// const session = await mongoose.startSession();


// session is now an object that you can pass to queries like .save({ session }) or .find(...).session(session)

// 🔹 2. session.startTransaction();

// What it is:
// Begins a transaction inside the session.

// Purpose:

// All database operations after this line and within the session are part of a single transaction.

// Changes won’t be permanent until you commit the transaction.

// Example:

// session.startTransaction();


// You can now perform multiple operations, like updating multiple collections.

// 🔹 3. await session.commitTransaction();

// What it is:
// Commits (saves) all the operations done inside the transaction.

// Purpose:

// Makes all changes permanent in the database.

// If this line runs successfully, everything in the transaction is applied atomically.

// Example:

// await session.commitTransaction();
// console.log("Transaction successful!");


// If any operation failed before this, you can abort instead of committing.

// 🔹 4. await session.abortTransaction();

// What it is:
// Cancels (rolls back) the transaction.

// Purpose:

// If any operation inside the transaction fails, calling this will undo all changes made in the transaction.

// Ensures atomicity: either everything succeeds or nothing changes.

// Example:

// await session.abortTransaction();
// console.log("Transaction aborted due to error!");

// 🔹 5. session.endSession();

// What it is:
// Ends the session after transaction is finished (committed or aborted).

// Purpose:

// Frees up resources on the MongoDB server.

// Good practice to always call this in finally block to avoid memory leaks.

// Example:

// session.endSession();