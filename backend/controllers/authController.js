const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Register User
const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await User.findOne({
            where: { email }
        });


        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });


        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at
            }
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// Login User
const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({
            where: { email }
        });


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const match = await bcrypt.compare(
            password,
            user.password
        );


        if (!match) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }


        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at
            }
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    register,
    login
};