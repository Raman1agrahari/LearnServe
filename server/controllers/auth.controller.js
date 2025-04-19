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
        res.status(200).json({message:req.body});
    }catch(error){
        res.status(400).json("interval server error");
    }
};

 module.exports = {home, register};