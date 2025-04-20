const Contact = require("../model/contact.model");

const ContactForm = async (req, res) => {
    try{
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({msg:"message are sucessfully"});

    }catch(error){
        return res.status(500).json({message:"message not deliver"});
    }
};

module.exports = ContactForm;