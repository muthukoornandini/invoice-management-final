const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
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