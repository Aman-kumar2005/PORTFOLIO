import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("Connection Error:", err);
    process.exit(1);
  }
};

export default dbConnection;