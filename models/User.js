import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    }
},{ timestamps:true });

const User = mongoose.model('User', userSchema);

export default User;