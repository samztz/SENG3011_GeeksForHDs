import mongoose from 'mongoose';
import logger from '@config/winston';
import "dotenv/config";

export default async () => {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_URL,
  } = process.env;
  
  let connectionString = DB_URL;

}