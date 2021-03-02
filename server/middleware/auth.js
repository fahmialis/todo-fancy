const {User} = require('../models')
const {verify} = require('../helpers/jwt')


const Authenticate = (req, res, next) =>{
    // console.log(req.headers);
    try {
       let decode = verify(req.headers.access_token)
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
    // console.log(req.currentUser);
    console.log(`masuk authorize`);
    next()



}


module.exports = {
    Authenticate,
    Authorize
}