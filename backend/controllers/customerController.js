const Customer = require("../models/tempCustomer");


// Get All Customers
const getCustomers = async (req, res) => {

  try {

    const customers = await Customer.findAll();

    res.json(customers);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Add Customer
const addCustomer = async (req, res) => {

  try {

    const { name, email, phone, address } = req.body;

    const customer = await Customer.create({
      name,
      email,
      phone,
      address
    });

    res.status(201).json({
      message: "Customer added successfully",
      customer
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Update Customer
const updateCustomer = async (req, res) => {

  try {

    const { id } = req.params;

    const { name, email, phone, address } = req.body;

    const customer = await Customer.findByPk(id);

    if (!customer) {

      return res.status(404).json({
        message: "Customer not found"
      });

    }

    await customer.update({
      name,
      email,
      phone,
      address
    });

    res.json({
      message: "Customer updated successfully",
      customer
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Delete Customer
const deleteCustomer = async (req, res) => {

  try {

    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {

      return res.status(404).json({
        message: "Customer not found"
      });

    }

    await customer.destroy();

    res.json({
      message: "Customer deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer
};