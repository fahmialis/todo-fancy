const {User} = require('../models')
const jwt = require('jsonwebtoken')

const Authenticate = (req, res, next) =>{
    // console.log(req.headers);
    try {
       let decode = jwt.verify(req.headers.access_token,process.env.SECRET)
    // console.log(decode);
        User.findOne({
            where : {id : decode.id, email : decode.email}
        })
        .then(user =>{
            req.currentUser = {
                id : user.id,
                email : user.email
            }
            next()
        }) 
        .catch(err =>{
            // console.log(err);
            throw new Error({message : `you have to login first`})
        })
    } catch (error) {
        // console.log(error);
        res.status(401).json({message : `you have to login first`})      
    }
}

const Authorize = (req, res, next) =>{



}


module.exports = {
    Authenticate,
    Authorize
}