const User = require("../model/user.model");

const getAllUsers = async (req, res) => {
    try{
      const users = await User.find();
      console.log(users);
      if(!users || users.length ==0){
        return res.status(404).json({msg:"No Users Found"});
      }
      return res.status(200).json(users);
    }catch(error){
     next(error);
    }
}

module.exports = getAllUsers;