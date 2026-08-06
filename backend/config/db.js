const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "invoice_management",
  "root",
  "mysql@123",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected Successfully");
  } catch (error) {
    console.log("MySQL Connection Failed:", error.message);
  }
};

module.exports = { sequelize, connectDB };