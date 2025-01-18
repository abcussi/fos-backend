import express from 'express';
import { getProducts, createProduct, getProductsById } from '../controllers/productController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductsById);
router.post('/', auth, createProduct);

export default router;