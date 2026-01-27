import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('🛢 World Class Sync With Mongoose');

    app.listen(port, () => {
      console.log(`🚀 Application is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
