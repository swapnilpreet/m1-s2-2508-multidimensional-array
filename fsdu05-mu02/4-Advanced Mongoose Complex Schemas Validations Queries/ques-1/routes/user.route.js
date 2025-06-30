const express = require("express");
const UserModel = require("../models/user.model");
const AddressModel = require("../models/address.model");
const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    user.save();
    res.status(200).json({ msg: "User Created", user });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
});

userRouter.post("/:userId/address", async (req, res) => {
  try {
    const {street,city,pincode}=req.body;
    const user = await UserModel.findById(req.params.userId);
    if (!user) return res.status(404).send("User not found");

    const address = new AddressModel({
      street,
      city,
      pincode,
      whosAddress: [user._id],
    });

    const savedAddress = await address.save();
    user.addresses.push(savedAddress._id);
    await user.save();
     res.status(200).json({ msg: "Address added", user });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
});

userRouter.get('/summary', async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalAddresses = await AddressModel.countDocuments();
    const users = await UserModel.find().select('name addresses');

    const userSummaries = users.map(user => ({
      name: user.name,
      addressCount: user.addresses.length
    }));

    res.json({
      totalUsers,
      totalAddresses,
      users: userSummaries
    });

  } catch (err) {
    console.error('Error fetching user summary:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

userRouter.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId)
      .populate('addresses')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


userRouter.delete('/:userId/:addressId', async (req, res) => {
  const { userId, addressId } = req.params;
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { addresses: addressId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const deletedAddress = await AddressModel.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json({ message: 'Address removed from user and deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = userRouter;
