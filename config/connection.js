import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DBL = process.env.DATABASE_LOCAL;

const mongoos = mongoose
  .connect(DBL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default mongoos;