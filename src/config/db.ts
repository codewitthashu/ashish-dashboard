import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const uri = "mongodb://codewithashu74_db_user:AshishTest123@ac-wmoqa9u-shard-00-00.bzpsjg9.mongodb.net:27017,ac-wmoqa9u-shard-00-01.bzpsjg9.mongodb.net:27017,ac-wmoqa9u-shard-00-02.bzpsjg9.mongodb.net:27017/ashish-dashboard?ssl=true&replicaSet=atlas-11oepk-shard-0&authSource=admin";
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Error: ${message}`);
    process.exit(1);
  }
};

export default connectDB;
