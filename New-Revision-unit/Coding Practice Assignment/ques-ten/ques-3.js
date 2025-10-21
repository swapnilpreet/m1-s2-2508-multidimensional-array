app.delete("/users/:id", async (req, res) => {
  try {
    const User = await User.findByIdAndDelete(req.params.id);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});
