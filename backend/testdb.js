import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected Successfully!");
  process.exit(0);
})
.catch(err => {
  console.error("❌ MongoDB Connection Failed:", err.message);
  process.exit(1);
});
