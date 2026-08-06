const Customer = require("../models/tempCustomer");
const Invoice = require("../models/Invoice");


// Get Dashboard Data
const getDashboard = async (req, res) => {

    try {

        const customerCount = await Customer.count();

        const invoiceCount = await Invoice.count();

        const totalRevenue = await Invoice.sum("total_amount");


        res.json({

            customers: customerCount,

            invoices: invoiceCount,

            revenue: totalRevenue || 0

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


module.exports = {
    getDashboard
};