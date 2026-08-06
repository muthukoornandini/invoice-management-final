const Product = require("../models/Product");


// Get All Products
const getProducts = async (req, res) => {

    try {

        const products = await Product.findAll();

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Add Product
const addProduct = async (req, res) => {

    try {

        const { name, price, stock } = req.body;


        const product = await Product.create({
            name,
            price,
            stock
        });


        res.status(201).json({
            message: "Product added successfully",
            product
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Update Product
const updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const { name, price, stock } = req.body;


        const product = await Product.findByPk(id);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        await product.update({
            name,
            price,
            stock
        });


        res.json({
            message: "Product updated successfully",
            product
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Delete Product
const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;


        const product = await Product.findByPk(id);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        await product.destroy();


        res.json({
            message: "Product deleted successfully"
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
};