/**
 * Database Seeder
 * Chạy lệnh: node src/config/seeder.js
 * Xóa và reset data: node src/config/seeder.js --destroy
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Google DNS để resolve SRV record của MongoDB Atlas
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../../.env') });

import Course, { seedCourses } from '../models/Course.js';
import Blog, { seedBlogs } from '../models/Blog.js';
import { Testimonial, Teacher, seedTestimonials, seedTeachers } from '../models/User.js';

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB Atlas connected');
};

const importData = async () => {
  try {
    await connectDB();

    // Xóa data cũ
    await Course.deleteMany();
    await Blog.deleteMany();
    await Testimonial.deleteMany();
    await Teacher.deleteMany();
    console.log('🗑️  Old data cleared');

    // Insert seed data
    await Course.insertMany(seedCourses);
    console.log(`✅ Inserted ${seedCourses.length} courses`);

    await Blog.insertMany(seedBlogs);
    console.log(`✅ Inserted ${seedBlogs.length} blogs`);

    await Testimonial.insertMany(seedTestimonials);
    console.log(`✅ Inserted ${seedTestimonials.length} testimonials`);

    await Teacher.insertMany(seedTeachers);
    console.log(`✅ Inserted ${seedTeachers.length} teachers`);

    console.log('\n🎉 Database seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Course.deleteMany();
    await Blog.deleteMany();
    await Testimonial.deleteMany();
    await Teacher.deleteMany();
    console.log('🗑️  All data destroyed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Destroy error:', error.message);
    process.exit(1);
  }
};

// CLI: node seeder.js --destroy
if (process.argv[2] === '--destroy') {
  destroyData();
} else {
  importData();
}
