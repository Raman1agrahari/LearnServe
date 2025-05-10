const User = require("../model/user.model");
const contact = require("../model/contact.model");

const getAllUsers = async (req, res,next) => {
    try{
      const users = await User.find();
      console.log(users);
      if(!users || users.length==0){
        return res.status(404).json({msg:"No Users Found"});
      }
      return res.status(200).json(users);
    }catch(error){
        next(error);
    }
};

const getUserById = async (req, res,next) => {
    try{
    const id = req.params.id;
    const data = await User.findOne({ _id: id },{password:0});
     return res.status(200).json(data);
  }
  catch(error){
        next(error);
    }
};

const updateUserById = async (req, res,next) => {
    try{
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await updateOne({_id:id},{$set:updatedUserData,});
        return res.status(200).json(updatedData);
    }catch(error){
        next(error);
    }
}



const deleteUserById = async (req, res,next) => {
    try{
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  }
  catch(error){
        next(error);
    }
};



const getAllContacts = async (req, res,next) => {
    try{
        const contacts = await contact.find();
        console.log(contacts);
        if(!contacts || contacts.length==0){
            return res.status(404).json({msg:"No Contacts found"});
        }
        return res.status(200).json(contacts);
    }catch(error){
        next(error);
    }
};


const deleteContactById = async (req, res, next) => {
    try{
    const id = req.params.id;
    await contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "contact Deleted Successfully" });
  }
  catch(error){
        next(error);
    }
};

module.exports = {getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};


