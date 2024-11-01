const mongoose = require("mongoose");
require("dotenv").config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbAppName = process.env.DB_APPNAME;
const dbCluster = process.env.DB_CLUSTER;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@${dbUser}.dtzto.mongodb.net/${dbCluster}?retryWrites=true&w=majority&appName=${dbAppName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
