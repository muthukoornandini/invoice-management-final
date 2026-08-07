const { Sequelize } = require("sequelize");

const DB_HOST = (process.env.DB_HOST || "").trim();
const DB_PORT = Number((process.env.DB_PORT || "").trim());
const DB_NAME = (process.env.DB_NAME || "").trim();
const DB_USER = (process.env.DB_USER || "").trim();
const DB_PASSWORD = (process.env.DB_PASSWORD || "").trim();

console.log("DB_HOST:", JSON.stringify(DB_HOST));
console.log("DB_PORT:", JSON.stringify(DB_PORT));
console.log("DB_NAME:", JSON.stringify(DB_NAME));
console.log("DB_USER:", JSON.stringify(DB_USER));

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected Successfully");
  } catch (error) {
    console.error("MySQL Connection Failed:", error);
  }
};

module.exports = { sequelize, connectDB };