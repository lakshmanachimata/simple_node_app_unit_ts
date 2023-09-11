const Joi =  require("joi")


 const adduserobj = {
    body : Joi.object({
        name : Joi.string().required(),
        permission : Joi.number().integer().required()
    })
    
 } 
module.exports = {
    adduserobj
} 

