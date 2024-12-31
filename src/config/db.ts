import chalk from "chalk";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    console.log(chalk.cyanBright(`Mongo Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(chalk.red("Error connecting to MongoDB:", error)); // לוג אדום כשיש שגיאה
  }
};

export default connectDB;
