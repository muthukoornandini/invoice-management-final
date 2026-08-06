const express = require("express");

const router = express.Router();


const {
  getInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");



// Get all invoices
router.get("/", getInvoices);


// Create invoice
router.post("/", addInvoice);


// Update invoice
router.put("/:id", updateInvoice);


// Delete invoice
router.delete("/:id", deleteInvoice);



module.exports = router;