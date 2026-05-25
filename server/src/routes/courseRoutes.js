import express from 'express';
import { getAllCourses, getCourse, getFeatured, getPopular } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/featured', getFeatured);
router.get('/popular', getPopular);
router.get('/:id', getCourse);

export default router;
