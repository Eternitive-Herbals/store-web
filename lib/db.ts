import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );

    console.log(`\n ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`something went wrong Error:`, error);
    process.exit(1);
  }
};

export default connectDB;
