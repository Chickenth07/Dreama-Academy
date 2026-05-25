import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });


import connectDB from './config/db.js';
import Course, { seedCourses } from './models/Course.js';
import Blog, { seedBlogs } from './models/Blog.js';
import { Testimonial, Teacher, seedTestimonials, seedTeachers } from './models/User.js';

const seed = async () => {
  try {
    await connectDB();
    console.log('\n🌱 Starting database seed...\n');

    // Clear existing data
    await Promise.all([
      Course.deleteMany({}),
      Blog.deleteMany({}),
      Testimonial.deleteMany({}),
      Teacher.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    const [courses, blogs, testimonials, teachers] = await Promise.all([
      Course.insertMany(seedCourses),
      Blog.insertMany(seedBlogs),
      Testimonial.insertMany(seedTestimonials),
      Teacher.insertMany(seedTeachers),
    ]);

    console.log(`✅ Courses:      ${courses.length} inserted`);
    console.log(`✅ Blogs:        ${blogs.length} inserted`);
    console.log(`✅ Testimonials: ${testimonials.length} inserted`);
    console.log(`✅ Teachers:     ${teachers.length} inserted`);
    console.log('\n🎉 Seed completed successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
