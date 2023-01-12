const userModel = require('../model/model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const register = async (req , res) => {
    try{
        const {fullname , username , password , email} = req.body;
        const password_hash = await bcrypt.hash(password , 10);
        const saveData = await new userModel({
            fullname: fullname,
            username: username,
            password: password_hash,
            email: email
        });
        await saveData.save();
        const token = await jwt.sign(
            {data: saveData.fullname},
            process.env.SECRETKEY,
            {expiresIn: '1h'}
        );
        res.status(201).json({token : token});
    }catch(err){
        console.log(err);   
    }
}

const login = async (req , res) => {
    try{
        const {UsernameOrEmail , password} = req.body;
        const docs = await userModel.find({
            $or: [
                {username: UsernameOrEmail},
                {email: UsernameOrEmail}
            ]
        });
        if(docs.length > 0){
            const compareResult = await bcrypt.compare(password , docs[0].password);
            if(compareResult){
                const token = await jwt.sign(
                    {data: docs[0].fullname},
                    process.env.SECRETKEY,
                    {expiresIn: '1h'}
                );
                return res.status(200).json({token : token});
            }
        }
        res.status(400).json({msg: 'error'});
    }catch(err){
        console.log(err);
    }
}

const auth = async (req , res) => {
    try{
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).json({msg: 'error'});
        }
        jwt.verify(token , process.env.SECRETKEY , (err , decoded) => {
            if(err){
               return res.status(403).json({msg: 'error'}); 
            }
            res.status(200).json({decoded: decoded});
        });
    }catch(err){
        console.log(err);
    }
}

const forgotPassword = async (req , res) => {
    try{
        const {email , password} = req.body;
        const password_hash = await bcrypt.hash(password , 10);
        const updateData = await userModel.findOneAndUpdate({email: email} , {password: password_hash}); 
        if(updateData === null){
           return res.status(400).json({msg: 'error'}); 
        }
        res.status(200).json({msg: 'successfully to update'});
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    register,
    login,
    auth,
    forgotPassword
}