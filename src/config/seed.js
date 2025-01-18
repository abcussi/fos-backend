import User from '../models/user.js';
import Product from '../models/product.js';

const seedData = async () => {
  try {
    console.log('Clearing existing data...');
    
    // Limpiar datos existentes
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({})
    ]);
    console.log('Data cleared.');

    // Crear usuario de prueba
    const testUser = await User.create({
      email: 'test@example.com',
      password: 'password123', // Recuerda hashear la contraseña en producción
      name: 'Test User',
      condominium: 'Test Condominium',
    });
    console.log(`Test user created: ${testUser.email}`);
    const CURRENT_URL = process.env.URL
    // Crear productos de prueba
    const products = [
      {
        name: 'Bicicleta Mountain Bike',
        description: 'Bicicleta en excelente estado',
        price: 299.99,
        category: 'Sports',
        images: [`${CURRENT_URL}/public/images/placeholder.png`],
        seller: testUser._id,
        condominium: 'Test Condominium',
      },
      {
        name: 'Mesa de jardín',
        description: 'Mesa con 4 sillas',
        price: 150,
        category: 'Furniture',
        images: [`${CURRENT_URL}/public/images/placeholder.png`],
        seller: testUser._id,
        condominium: 'Test Condominium',
      },
    ];

    await Product.insertMany(products);
    console.log('Products inserted successfully.');

  } catch (error) {
    console.error('Error seeding data:', error.message);
    console.error(error.stack);
  }
};

export default seedData;
