const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  const conn = await mongoose.connect(DB, {
    // optional mongoose options
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.set("strictQuery", true);

  cached.conn = conn;
  console.log("DB connection successful!");
  return conn;
};

module.exports = connectDB;
