const {User} = require('../models')
const {comparePassword} = require('../helpers/bycriptjs')
const jwt = require('jsonwebtoken');


class UserController {
    static register(req, res){
        let data = {
            email : req.body.email,
            password : req.body.password
        }

        User.create(data)
        .then(user =>{
            res.status(201).json({success: true, message : 'user created', user}, )
        })
        .catch(err =>{
            console.log(err)
            const errorMsg = err.errors[0].message
            res.status(500).json({message : errorMsg})
        })
    }


    static login(req, res){
        // res.send('login')
        const email = req.body.email
        const password = req.body.password

        User.findOne({where : {email}})
        .then(user =>{
            if (user){
                const passCompared = comparePassword(password,user.password)
                // console.log(passCompared);

                if(passCompared){
                    const access_token = jwt.sign({
                        id : user.id,
                        email : user.email
                    }, process.env.SECRET)

                    res.status(200).json({access_token})
                } else {
                    throw {msg : 'invalid email or password'}
                }   
            }
        })
        .catch(err =>{
            if(err.msg){
                res.status(401).json({ message: err.message });
            } else {
              res.status(500).json({message : errorMessage})  
            }    
        })
    }

}


module.exports = UserController