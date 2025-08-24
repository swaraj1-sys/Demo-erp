import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
});

export default mongoose.model("Customer", customerSchema);
