const {User} = require('../models')
const {comparePassword} = require('../helpers/bycriptjs')
const {sign} = require('../helpers/jwt')


class UserController {
    static register(req, res,next){
        let data = {
            email : req.body.email,
            password : req.body.password
        }

        User.create(data)
        .then(user =>{
            res.status(201).json({success: true, message : 'user created', user}, )
        })
        .catch(err =>{
            // console.log(err)
            let errMsg = []
               for ( let i = 0; i < err.errors.length; i++){
                // console.log(err.errors[i].message);
                errMsg.push(err.errors[i].message) 
               }
            next({
                code : 500,
                message : errMsg
            })
        })
    }


    static login(req, res,next){
        // res.send('login')
        const email = req.body.email
        const password = req.body.password

        User.findOne({where : {email}})
        .then(user =>{
            if (user){
                const passCompared = comparePassword(password,user.password)
                // console.log(passCompared);

                if(passCompared){
                    const access_token = sign({
                        id : user.id,
                        email : user.email
                    })

                    res.status(200).json({access_token})
                } else {
                    next({
                        code: 401,
                        message : `Invalid email or password`
                    })
                }   
            }
        })
        .catch(err =>{
            if(err.msg){
                res.status(401).json({ message: err.message });
            } else {
                next({
                    code : 500,
                    message : `Internal Server Error`
                })  
            }    
        })
    }

}


module.exports = UserController