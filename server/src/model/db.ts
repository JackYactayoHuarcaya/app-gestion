import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const urlMongo = "mongodb://127.0.0.1:27017/gestion";
    const db = await mongoose.connect(urlMongo);
    return db;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
