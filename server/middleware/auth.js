const {User, ToDo} = require('../models')
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
    console.log(req.currentUser, 'ini curretn user');
    // console.log(req.params, 'ini params');
    let userId = req.currentUser.id
    // console.log(`masuk authorize`);
    ToDo.findOne({
        where: {
            id: +req.params.id
        }
    })
    .then(data =>{
        // console.log(data, 'data find one');
        // res.send(data)
        if(data){
            let validUser = +data.UserId === +userId
            // console.log(validUser, +data.UserId , +userId);
            if(validUser){
                next()
            } else {
                next({
                    code : 404,
                    message : 'ToDo not found'
                })
            }
        } else {
            next({
                code : 404,
                message : 'ToDo not found'
            }) 
        }
    })
    .catch(err =>{
        console.log(err);
        next({
            code: 500,
            message:"Internal Server Error"
        })
    })
}


module.exports = {
    Authenticate,
    Authorize
}