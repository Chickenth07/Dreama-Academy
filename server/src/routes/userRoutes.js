import express from 'express';
import {
  getTestimonials,
  getTeachers,
  submitContact,
  register,
  login,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/testimonials', getTestimonials);
router.get('/teachers', getTeachers);
router.post('/contact', submitContact);
router.post('/register', register);
router.post('/login', login);

export default router;
