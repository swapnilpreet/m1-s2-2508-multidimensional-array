const express = require('express');
const blogModel = require('../models/blog.model');
const auth = require('../middleware/authmiddleware');
const blogRoutes = express.Router();

blogRoutes.use(auth);

blogRoutes.post('/', async (req, res) => {
  try {
    const blog = new blogModel({ ...req.body, createdBy: req.user._id });
    await blog.save();
    res.status(201).json(blog);
  } catch {
    res.status(400).json({ message: 'Failed to create blog' });
  }
});


blogRoutes.get('/', async (req, res) => {
  const blogs = await blogModel.find({ createdBy: req.user._id });
  res.json(blogs);
});


blogRoutes.put('/:id', async (req, res) => {
  const blog = await blogModel.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true }
  );
  if (!blog) return res.status(404).json({ message: 'Blog not found or not yours' });
  res.json(blog);
});


blogRoutes.delete('/:id', async (req, res) => {
  const blog = await blogModel.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  if (!blog) return res.status(404).json({ message: 'Blog not found or not yours' });
  res.json({ message: 'Blog deleted' });
});


blogRoutes.get('/stats', async (req, res) => {
  try {
    const stats = await blogModel.aggregate([
      {
        $facet: {
          totalBlogs: [{ $count: "count" }],
          blogsPerUser: [
            { $group: { _id: "$createdBy", count: { $sum: 1 } } },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
              }
            },
            {
              $project: {
                _id: 0,
                user: { $arrayElemAt: ["$user.name", 0] },
                count: 1
              }
            }
          ],
          topTags: [
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
          ]
        }
      }
    ]);
    res.json(stats[0]);
  } catch (err) {
    res.status(500).json({ message: 'Aggregation error' });
  }
});

module.exports = blogRoutes;
