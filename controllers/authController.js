import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/User.js";

export const registerUser = async (req,res)=>{
    try {
        
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message:'User with this email already exist'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

export const login = async (req,res)=>{
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password is required'
            })
        }
    
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                message: 'User with this email doesnot exist'
            })
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }
    
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );
    
        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error'})
    }

}

export const getProfile = async (req,res)=>{
    try {
        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({
                message: 'Profile doesnot exist'
            })
        } else{
            return res.status(200).json({
                message: 'Profile fetched successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                }
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error'})
    }
}