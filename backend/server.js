const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");

const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/ProductRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Create database tables
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database Synced");
  })
  .catch((err) => {
    console.error("Sync Error:", err);
  });

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Invoice Management Backend Running");
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});