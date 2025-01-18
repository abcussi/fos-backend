import mongoose from 'mongoose';

const connectDB = async () => {
  const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/condaty-marketplace', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('MongoDB connected successfully');
      })
      .catch(err => {
        console.error('MongoDB connection error:', err.message);
        console.log('Retrying in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
      });
  };

  connectWithRetry();
};

export default connectDB;
