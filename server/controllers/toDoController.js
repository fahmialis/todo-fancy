const {ToDo} = require('../models')

class ToDoController {
    static add(req, res, next){
        let data = {
            title : req.body.title,
            description : req.body.description,
            due_date : req.body.due_date,
            UserId : +req.currentUser.id
        }

        ToDo.create(data)
        .then(data =>{
            res.status(201).json({message : 'task successfully added', data})
        })
        .catch(err =>{
            if(err.errors){
               let errMsg = []
               for ( let i = 0; i < err.errors.length; i++){
                errMsg.push(err.errors[i].message)   
            } 
                next({
                    code : 400,
                    message : errMsg
                })
            } else {
                next({
                    code : 500,
                    message : `Internal server error`
                })
            }
        })
    }

    static read(req, res, next){
        let action = req.action
        ToDo.findAll({
            where : {
                UserId : +req.currentUser.id
            }
        })
        .then(data =>{
            res.status(200).json({message : `task found is`, data, action })
        })
        .catch(err =>{
            next({
                code: 500,
                message: `Internal Server Error`
            })
        })
    }

    

    static findById(req, res, next){
        let id = +req.params.id
        ToDo.findByPk(id)
        .then(data =>{
            if(!data){
                next({
                    code : 404,
                    message : `ToDo not found`
                })
            } else {
                res.status(200).json({message : `task found is`, data})
            }
        })
        .catch(err =>{
            console.log(err);
            next({
                code: 500,
                message:`Internal Server Error`
            })
        })
    }

    static editTask(req, res, next){
        let id = +req.params.id

        let data = {
            title : req.body.title,
            description : req.body.description,
            status: req.body.status,
            due_date : req.body.due_date
        }

        ToDo.update(data,{
            where : {id}
        }) 
        .then(data =>{
            if(data[0] === 1){
               res.status(200).json({message : `task is updated`}) 
            } else {
                next({
                    code : 404,
                    message : `ToDo not found`
                })
            }        
        })
        .catch(err =>{
            next({
                code: 500,
                message:`Internal Server Error`
            })      
        })
    }


    static editStatus(req, res, next){
        let id = +req.params.id
        let status = req.body.status

        ToDo.update({status}, {
            where : {id}
        })
        .then(data =>{
            if(data[0] === 1){
                res.status(200).json({message : `task is updated`}) 
             } else {
                next({
                    code : 404,
                    message : `ToDo not found`
                })
             }   
        })
        .catch(err =>{
            next({
                code: 500,
                message:`Internal Server Error`
            }) 
        })

    }

    static delete(req, res, next){
        let id = +req.params.id

        ToDo.destroy({where : {id}})
        .then(data =>{
            if(!data){
                next({
                    code : 404,
                    message : `ToDo not found`
                })
            } else {
                res.status(200).json({message : `Todo success to delete`})
            }
        })
        .catch(err =>{
            next({
                code: 500,
                message:`Internal Server Error`
            }) 
        })

    }
}

module.exports = ToDoController