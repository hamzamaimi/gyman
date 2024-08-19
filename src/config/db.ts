import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const dbCache: { [key: string]: mongoose.Connection } = {};

const connectDB = async (tenant:string) => {
  const dbName:string = 'gyman_' + tenant;
  const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017';

  if (!dbCache[dbName]) {
    try {
      // Create a new connection and cache it
      const connection = await mongoose.createConnection(`${uri}/${dbName}`,{
        //options
      }).asPromise();

      dbCache[dbName] = connection;
      console.log('Connected to database: '+ dbName);
    } catch (err) {
      console.error('MongoDB connection error:', err);
      throw err;
    }
  }

  return dbCache[dbName];
};

export default connectDB;