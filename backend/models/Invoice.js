const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    invoice_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    customer_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    product: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    invoice_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Pending",
    },
  },
  {
    tableName: "invoices",
    timestamps: false,
  }
);

module.exports = Invoice;