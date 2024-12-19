const express = require('express');
const multer = require('multer');
const Blog = require('../models/Blog');

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'), // Upload directory
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), // Unique filename
});
const upload = multer({ storage });

// Create a new blog post
router.post('/create', upload.single('image'), async (req, res) => {
  const { title, content, post } = req.body; // Added `post` field
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Handle uploaded image

  try {
    const newBlog = new Blog({
      title,
      content,
      image: imagePath,
      post, // Save `post` if provided
    });

    await newBlog.save();
    res.json({ message: 'Blog created successfully', blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a blog post
router.put('/update/:id', upload.single('image'), async (req, res) => {
  const { title, content, post } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    // Update fields if provided
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.post = post || blog.post; // Update `post` field
    if (imagePath) blog.image = imagePath;

    await blog.save();
    res.json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a blog post
router.delete('/delete/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
