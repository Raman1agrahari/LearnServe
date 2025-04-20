const { parseAsync } = require("../validator/auth.validator");

const validate = (schema) => async (req, res, next) => {
    try{
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    }catch(err){
        const status = 422;
        const message = "Fill yhe input properly";
        const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails,
        };
        console.log(message);
        next(error);

    }
};

module.exports = validate ;