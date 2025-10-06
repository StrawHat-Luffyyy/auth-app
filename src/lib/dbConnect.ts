import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState >= 1 ) return; // already connected
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Mongoose Connected");
  } catch (error) {
    console.error("Mongoose Connection Error", error);
  }
};
