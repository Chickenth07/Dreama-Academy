import express from 'express';
import { getAllBlogs, getBlog, getLatest } from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/latest', getLatest);
router.get('/:id', getBlog);

export default router;
