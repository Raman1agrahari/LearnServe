const User = require("../model/user.model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try{
        res.status(200).send("welcome");
    }catch(error){
        console.log("Error in home route", error);
    }
};


const register = async (req, res) => {
    try{
        console.log(req.body);
         const {username,email,phone,password} = req.body;
  
         const userExist = await User.findOne({email});

         if(userExist){
            return res.status(400).json({msg:"email already exist"});
         }
       
        const userCreated = await User.create({username,email,phone,password,});
        res.status(201).json({msg:userCreated, token: await userCreated.generateToken(),userId:userCreated._id.toString()});

    }catch(error){
        console.error("Register Error: ", error);
        res.status(500).json({ message: "internal server error" });

    }
};


const login = async (req, res) =>{
    try{
      const {email,password} = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const userExist = await User.findOne({email});
       

      if(!userExist){
       return res.status(400).json({message:"invalid credentials"});
      }

      const isPasswordValid = await userExist.comparePassword(password);
      
      if(isPasswordValid){
       res.status(200).json({msg:"login successfully", token: await userExist.generateToken(),userId:userExist._id.toString()});
       }
       else{
           res.status(401).json({message:"invalid email or password" })
       }

   }catch(error){
       console.error("login Error: ", error);
       res.status(500).json({ message: "internal server error" });
   }
}
 

module.exports = {home, register, login};