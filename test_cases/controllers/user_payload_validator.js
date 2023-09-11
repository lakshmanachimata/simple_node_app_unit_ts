const Joi =  require("joi")


 const adduserobj = {
    body : Joi.object({
        name : Joi.string().required(),
        age : Joi.number().integer().required()
    })
    
 } 
module.exports = {
    adduserobj
} 

