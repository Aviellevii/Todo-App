const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    RegisterUsers:(req,res) => {
        const {username,password} = req.body;
        User.find({username}).then((users) =>{
            if(users.length >= 1){
                return res.status(409).json({
                    message:'Username is exist'
                })
            }
            bcrypt.hash(password,10,(err,hash) => {
                if(err){
                    return res.status(200).json({
                        err
                    })
                }
                const newUser =new User ({
                    username,
                    password:hash
                })
                newUser.save().then((result) => {
                    console.log(result);
                    res.status(200).json({
                        message:'user Added'
                    })
                }).catch(err=>{
                    res.status(200).json({
                        err
                    })
                })
            })
        })
    },
    LoginUser:(req,res) => {
        const {username,password} = req.body;
        User.find({username}).then((users)=>{
            if(users.length === 0){
                return res.status(401).json({
                  message:'Auth faild'
                })
            }
            const [user] = users
            bcrypt.compare(password, user.password ,(error,result) =>{
                if(error){
                    return res.status(401).json({
                        message:'Auth faild'
                      })
                }
                if(result){
                    const token = jwt.sign({
                        id:user._id,
                        username:user.username
                    },process.env.JWT_KEY,
                    {
                        expiresIn:"1H"
                    })
                    return res.status(200).json({
                        message:'Auth Success',
                        token,
                        user:{
                            id: user._id,
                            username:user.username
                        }
                    })
                }
                res.status(401).json({
                    message:'Auth faild'
                  })
            })
        })
    }
}