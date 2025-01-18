import Product from '../models/product.js';

export const getProducts = async (req, res) => {
  try {
    const { category, condominium } = req.query;
    let query = {};

    if (category) query.category = category;
    if (condominium) query.condominium = condominium;

    const products = await Product.find(query)
      .populate('seller', 'name condominium')
      .sort('-createdAt');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name condominium');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, condominium } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      condominium,
      seller: req.user.userId,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};