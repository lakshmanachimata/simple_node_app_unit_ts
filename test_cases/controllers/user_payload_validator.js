const Joi =  require("joi")


 const adduserobj =Joi.object({
    name : Joi.string().required(),
    age : Joi.number().integer().required()
})


 const adduservalidate = { 
    body : adduserobj
 }

module.exports = {
    adduservalidate
} 

