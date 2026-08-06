const Invoice = require("../models/Invoice");


// Get all invoices
const getInvoices = async (req, res) => {
  try {

    const invoices = await Invoice.findAll({
      order: [["id", "DESC"]],
    });

    res.json(invoices);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};




// Add invoice
const addInvoice = async (req, res) => {

  try {

    const {
      invoice_number,
      customer_name,
      product,
      invoice_date,
      total_amount,
      status,
    } = req.body;



    const invoice = await Invoice.create({

      invoice_number,

      customer_name,

      product,

      invoice_date,

      total_amount,

      status

    });



    res.status(201).json({

      message:"Invoice created successfully",

      invoice

    });



  } catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};






// Update invoice
const updateInvoice = async (req,res)=>{

  try{


    const invoice = await Invoice.findByPk(req.params.id);


    if(!invoice){

      return res.status(404).json({

        message:"Invoice not found"

      });

    }



    const {

      customer_name,

      product,

      invoice_date,

      total_amount,

      status

    } = req.body;




    await invoice.update({

      customer_name,

      product,

      invoice_date,

      total_amount,

      status

    });



    res.json({

      message:"Invoice updated successfully",

      invoice

    });



  }
  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};







// Delete invoice
const deleteInvoice = async (req, res) => {

  try {

    const invoice = await Invoice.findByPk(req.params.id);


    if (!invoice) {

      return res.status(404).json({

        message:"Invoice not found"

      });

    }



    await invoice.destroy();



    res.json({

      message:"Invoice deleted successfully"

    });



  } catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};





module.exports = {

  getInvoices,

  addInvoice,

  updateInvoice,

  deleteInvoice,

};