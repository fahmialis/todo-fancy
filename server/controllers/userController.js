const {User} = require('../models')
const {comparePassword} = require('../helpers/bycriptjs')
const {sign} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')


class UserController {
    static register(req, res,next){
        let data = {
            email : req.body.email,
            password : req.body.password
        }

        User.create(data)
        .then(user =>{
            res.status(201).json({success: true, message : 'user created', id : user.id, email: user.email}, )
        })
        .catch(err =>{
            // console.log(err)
            if(err.errors){
               let errMsg = []
               for ( let i = 0; i < err.errors.length; i++){
                // console.log(err.errors[i].message);
                errMsg.push(err.errors[i].message) 
               } 
            } else {
              next({
                code : 500,
                message : errMsg
            })  
            } 
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

                    res.status(200).json({access_token,id : user.id, email: user.email})
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

    static loginGoogle(req, res){

        // console.log('login');
        // console.log(req.body.access_token);
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        async function verify() {

            // console.log('verify');
            const ticket = await client.verifyIdToken({
                idToken: req.body.access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const googleUserParams = ticket.getPayload();
            User.findOrCreate({
                where : {
                    email : googleUserParams.email
                },
                defaults : {
                    name : googleUserParams.name,
                    password : 'test'
                }   
            })
            .then(data =>{
                // console.log(data, 'ini dataa=============');
                const access_token = sign({
                    id : data.id,
                    email : data.email
                })
                res.status(200).json({access_token})
            })
        }
        verify().catch(console.error);
    }

}


module.exports = UserController