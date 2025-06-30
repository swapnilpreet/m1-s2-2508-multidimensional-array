const ProfileModel = require("../model/profile.model");
const UserModel = require("../model/user.model");


exports.addUser = async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Email already exists";
      err.status = 400;
    }
    next(err);
  }
};


exports.addProfile = async (req, res, next) => {
   try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = new ProfileModel(req.body);
    await profile.save();
 
    user.profiles.push(profile._id);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { profile } = req.query;
    let users = await UserModel.find().populate("profiles");

    if (profile) {
      users = users.filter(user =>
        user.profiles.some(p => p.profileName === profile)
      );
    }

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { name, profile } = req.query;
    console.log("name",name);
    const user = await UserModel.findOne({ name: new RegExp(`^${name}$`, 'i') }).populate("profiles");
    console.log("user",user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const foundProfile = user.profiles.find(p => p.profileName === profile);

    if (foundProfile) {
      return res.status(200).json(foundProfile);
    } else {
      return res.status(200).json({
        message: "User found, but profile not found",
        user,
      });
    }
  } catch (err) {
    next(err);
  }
};


exports.updateProfile = async (req, res, next) => {
   try {
    const { userId, profileName } = req.params;
    const { url } = req.body;
    const user = await UserModel.findById(userId).populate("profiles");
    if (!user) return res.status(404).json({ message: "User not found" });
    const profile = user.profiles.find(p => p.profileName === profileName);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    profile.url = url;
    await profile.save();
    res.status(200).json({ message: "Profile updated", profile });
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const { userId, profileName } = req.params;
    const user = await UserModel.findById(userId).populate("profiles");
    if (!user) return res.status(404).json({ message: "User not found" });
    const profileToDelete = user.profiles.find(p => p.profileName === profileName);
    if (!profileToDelete) return res.status(404).json({ message: "Profile not found" });
    user.profiles = user.profiles.filter(p => p._id.toString() !== profileToDelete._id.toString());
    await user.save();
    await ProfileModel.findByIdAndDelete(profileToDelete._id);
    res.status(200).json({ message: "Profile deleted", profileId: profileToDelete._id });
  } catch (err) {
    next(err);
  }
};
