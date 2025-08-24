import express from "express";
import Customer from "../models/Customer.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "No token provided" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// CRUD
router.post("/", auth, async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
});

router.get("/", auth, async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

router.put("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(customer);
});

router.delete("/:id", auth, async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
});

export default router;
