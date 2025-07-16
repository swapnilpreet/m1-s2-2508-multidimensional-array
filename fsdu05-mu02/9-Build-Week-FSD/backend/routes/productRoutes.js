import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); // Admin can create products

router.route('/:id/reviews')
  .post(protect, createProductReview); // Users can review products

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct) // Admin can update products
  .delete(protect, admin, deleteProduct); // Admin can delete products

export default router;