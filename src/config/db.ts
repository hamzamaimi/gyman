import mongoose, { Connection, Mongoose } from 'mongoose';
import * as dotenv from 'dotenv';
import path from "path";
import { DB_CONNECTION_ERROR } from '../constants/errorsConstants';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectionCache: { [key: string]: Connection } = {};

/**
 * @param databaseName 
 * Tenant name used to connect to it's database.
 * @description
 * Create a connection to the database if it doesn't exist, 
 * otherwise returns the connection stored in cache.
 * @returns
 * Mongoose connection to the tenant database.
 */
const connectDB = async (databaseName:string) => {
  const dbName:string = 'gyman_' + databaseName;
  const uri: string = process.env.MONGO_URI || '';

  if(connectionCache[dbName]){
    return connectionCache[dbName];
  }
  try{
    // Create a new connection
    const connection = mongoose.createConnection(`${uri}/${dbName}`, {});
    connectionCache[dbName] = connection;
    return connectionCache[dbName];
  }catch(err){
    console.error(DB_CONNECTION_ERROR, err);
  }
};

export default connectDB;