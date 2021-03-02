const {ToDo} = require('../models')


class ToDoController {
    static add(req,res){
        // res.send('adding')
        let data = {
            title : req.body.title,
            description : req.body.description,
            due_date : req.body.due_date
        }

        ToDo.create(data)
        .then(data =>{
            res.status(201).json({message : 'task successfully added', data})
        })
        .catch(err =>{
            // console.log(err);
            const errMessage = err.errors[0].message
            res.status(500).json({message : errMessage})
        })
    }

    static read(req, res){
        // res.send('get data')
        ToDo.findAll({where : {
            status : 'on progress'
        }})
        .then(data =>{
            res.status(200).json({message : `task found is`, data})
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message : `internal server error`})
        })

    }

    static readCompleted(req, res){
        // res.send('get data')
        ToDo.findAll({where : {
            status : 'completed'
        }})
        .then(data =>{
            res.status(200).json({message : `task found is`, data})
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message : `internal server error`})
        })

    }

    static findById(req, res){
        // res.send(`find id : ${+req.params.id}`)
        let id = +req.params.id

        ToDo.findByPk(id)
        .then(data =>{
            if(!data){
                throw {message : `data not found`}
            }
            res.status(200).json({message : `task found is`, data})
        })
        .catch(err =>{
            // console.log(err);
            res.status(404).json(err)
        })
    }

    static editTask(req, res){
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
            // console.log(data);
            if(data === 1){
               res.status(200).json({message : `task is updated`, data}) 
            } else {
                throw {message : `data not found`}
            }        
        })
        .catch(err =>{
            // console.log(err);
            res.status(404).json(err);        
        })
    }


    static editStatus(req, res){
        let id = +req.params.id
        let status = req.body.status

        ToDo.update({status}, {
            where : {id}
        })
        .then(data =>{
            if(data === 1){
                res.status(200).json({message : `task is updated`, data}) 
             } else {
                throw {message : `data not found`}
             }   
        })
        .catch(err =>{
            if(err){
                res.status(404).json(err);
            } else {
                res.status(500).json({message : `internal server error`})
            }
        })

    }

    static delete(req, res){
        let id = +req.params.id

        ToDo.destroy({where : {id}})
        .then(data =>{
            // console.log(data);
            if(!data){
                throw {message : `data not found`}
            } else {
                res.status(200).json({message : "Todo success to delete"})
            }
        })
        .catch(err =>{
            // console.log(err);
            if(err){
                res.status(404).json(err);
            } else {
                res.status(500).json({message : `internal server error`})
            }
        })

    }
}

module.exports = ToDoController