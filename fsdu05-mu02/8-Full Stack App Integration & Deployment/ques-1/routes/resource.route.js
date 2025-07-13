
const express=require("express");
const ResourceModel = require("../models/resource.model");
const auth = require("../middlewares/auth.middleware");
const moderatorCheck = require("../middlewares/moderator.middleware");
const adminCheck = require("../middlewares/role.middleware");

const ResourceRouter=express.Router();

// done-auth-68722eccb983a7a12e9f3d05
ResourceRouter.post('/resources', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newResource = new ResourceModel({
      title,
      content,
      createdBy: req.user.id
    });
    const resource = await newResource.save();
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// done-auth;
ResourceRouter.get('/resources', auth, async (req, res) => {
  try {
    const resources = await ResourceModel.find().populate('createdBy', ['username', 'role', 'profile']);
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//done-auth
ResourceRouter.get('/resources/:id', auth, async (req, res) => {
    try {
        const resource = await ResourceModel.findById(req.params.id).populate('createdBy', ['username', 'role']);
        if (!resource) {
            return res.status(404).json({ msg: 'Resource not found' });
        }
        res.json(resource);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


ResourceRouter.put('/resources/:id', auth, moderatorCheck,async (req, res) => {
    const { title, content } = req.body;
    try {
        let resource = await ResourceModel.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ msg: 'Resource not found' });
        }
        
        resource = await ResourceModel.findByIdAndUpdate(req.params.id, { $set: { title, content } }, { new: true });
        res.json(resource);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


ResourceRouter.delete('/resources/:id', auth, adminCheck, async (req, res) => {
    try {
        let resource = await ResourceModel.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ msg: 'Resource not found' });
        }
        
        await ResourceModel.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Resource removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports=ResourceRouter;