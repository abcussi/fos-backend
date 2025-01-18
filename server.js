import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import seedData from './src/config/seed.js';
import authRoutes from './src/routes/auth.js';
import productRoutes from './src/routes/product.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Conectar a MongoDB y sembrar datos
connectDB().then(() => {
  if (process.env.NODE_ENV !== 'production') {
    seedData();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
