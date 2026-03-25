import express from 'express';
import multer from 'multer';
import path from 'path';
import Post from '../models/Post.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Search posts
router.get('/search', auth, async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ posts: [] });
  try {
    const posts = await Post.find({
      $or: [
        { text:   { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all posts (paginated)
router.get('/', auth, async (req, res) => {
  const page  = parseInt(req.query.page)  || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Post.countDocuments();
    res.json({ posts, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create post
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { text } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  if (!text && !imageUrl)
    return res.status(400).json({ message: 'Post must have text or image' });
  try {
    const post = await Post.create({
      author: req.user.username,
      userId: req.user.id,
      text,
      imageUrl,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Toggle like
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const username = req.user.username;
    const liked = post.likes.includes(username);
    post.likes = liked
      ? post.likes.filter(u => u !== username)
      : [...post.likes, username];
    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add comment
router.post('/:id/comment', auth, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Comment cannot be empty' });
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ username: req.user.username, text });
    await post.save();
    res.json({ comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;