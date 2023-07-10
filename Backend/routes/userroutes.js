const express = require("express")
const userRouter = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { UserModel } = require("../models/user.model")

// get all the user
userRouter.get('/users', (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(users);
      }
    });
});

// register
userRouter.post("/register",async(req,res)=>{
    const {email, pass, age} = req.body;
    try {
        bcrypt.hash(pass, 5, async(err,hash)=>{
            const user= new UserModel({email, pass:hash, age});
            await user.save()
            res.status(201).send({"msg":"New user Register"})
        })
    } catch (error) {
        res.status(400).send({"msg":"error.message"})
    }
})


// login
userRouter.post("/login", async(req,res)=>{
    const {email, pass} =req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err,result)=>{
                if(result){
                    
                    const token = jwt.sign({"userID":user._id},"sahil",{expiresIn:60})
                    const refreshtoken= jwt.sign({"userID":user._id},"refresh",{expiresIn:180})
                    res.status(201).send({"msg":"Login Successful","token":token,"refresh-token":refreshtoken})
                }else{
                    res.status(400).send({"msg":"Wrong Data" })
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.patch("./update/blogID",async(req,res)=>{
    const data=req.body;
    const blogId=req.params.blogId;
    try {
        await UserModel.findByIdAndUpdate({_id:blogID},data)
        res.status(400).send("User deleted")
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})




module.exports={
    userRouter
}