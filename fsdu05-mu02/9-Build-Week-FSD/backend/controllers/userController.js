import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utills/generateToken.js';

 
const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const foundUser = await User.findById(userId);
  if (foundUser) {
    const userProfileResponse = {
      message: 'User profile fetched successfully.',
      data: {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        isAdmin: foundUser.isAdmin,
        myCarts: foundUser.myCarts,
        medicalHistory: foundUser.medicalHistory,
      },
    };
    res.status(200).json(userProfileResponse);
  } else {
     res.status(500).json({ message: 'The requested user profile was not found in the database.', error });
  }
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.body.medicalHistory) {
      user.medicalHistory = req.body.medicalHistory;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      medicalHistory: updatedUser.medicalHistory,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});



const addmedicalhistory=asyncHandler(async(req,res)=>{
    const {
      condition,
      diagnosisDate,
      medications,
      notes,
      prescriptionUrl,
    } = req.body;

    if (!condition || !diagnosisDate || !medications || medications.length === 0 || !prescriptionUrl) {
      res.status(400);
      throw new Error('Please provide condition, diagnosis date, medications, and prescription URL.');
    }

    const user = await User.findById(req.user._id);

    if (user) {
      const newMedicalEntry = {
        condition,
        diagnosisDate,
        medications,
        notes: notes || '',
        prescriptionUrl,
      };

      user.medicalHistory.push(newMedicalEntry);

      const updatedUser = await user.save();

      res.status(201).json({
        message: 'Medical history entry added successfully!',
        data: updatedUser.medicalHistory[updatedUser.medicalHistory.length - 1],
      });
    } else {
      res.status(404);
      throw new Error('User not found.');
    }
})



const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});


const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

 
const toggleCartItem = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const {medicineId}  = req.body;

  console.log("req.body",req.body)
  if (!medicineId) {
    return res.status(400).json({ message: "Medicine ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // console.log(user)
    if (!Array.isArray(user.myCarts)) {
      user.myCarts = [];
    }

    const index = user.myCarts.findIndex(
      (id) => id?.toString() === medicineId
    );

    // console.log("index",index)
    if (index > -1) {
      user.myCarts.splice(index, 1);
      await user.save();
      return res.status(200).json({
        message: "Medicine removed from cart",
        myCarts: user.myCarts,
      });
    } else {
      user.myCarts.push(medicineId);
      await user.save();
      return res.status(200).json({
        message: "Medicine added to cart",
        myCarts: user.myCarts,
      });
    }
  } catch (error) {
    console.error("toggleCartItem error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


const GetmyCartItem = asyncHandler(async (req, res) => {
   const userId = req.user?._id;

    if (!userId) {
      res.status(401);
      throw new Error('Not authorized, no user ID found in request.');
    }
    // console.log("userId",userId);

    const user = await User.findById(userId).populate('myCarts');

    // console.log("user",user);
    if (user) {
      res.status(200).json({
        message: 'User cart fetched successfully.',
        data: user.myCarts,
      });
    } else {
      res.status(404);
      throw new Error('User not found.');
    }
});

const clearUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await User.findByIdAndUpdate(userId, {
    $set: { myCarts: [] },
  });

  res.status(200).json({ message: "Cart cleared successfully" });
});


export {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addmedicalhistory,
  toggleCartItem,
  GetmyCartItem,
  clearUserCart,
};