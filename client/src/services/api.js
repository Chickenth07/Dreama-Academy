import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
    return Promise.reject(new Error(message));
  }
);

// ==================== COURSE API ====================
export const courseAPI = {
  getAll: (params = {}) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  getFeatured: () => api.get('/courses/featured'),
  getPopular: () => api.get('/courses/popular'),
};

// ==================== BLOG API ====================
export const blogAPI = {
  getAll: (params = {}) => api.get('/blogs', { params }),
  getById: (id) => api.get(`/blogs/${id}`),
  getLatest: (limit = 3) => api.get('/blogs/latest', { params: { limit } }),
};

// ==================== USER API ====================
export const userAPI = {
  getTestimonials: () => api.get('/users/testimonials'),
  getTeachers: () => api.get('/users/teachers'),
  submitContact: (data) => api.post('/users/contact', data),
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
};

export default api;
