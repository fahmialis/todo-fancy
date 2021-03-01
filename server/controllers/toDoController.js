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
            res.status(201).json({message : 'task successfully added'})
        })
        .catch(err =>{
            console.log(err);
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
            res.status(200).json({success : true, message : `task found is`, data})
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
            res.status(200).json({success : true, message : `task found is`, data})
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
            res.status(200).json({success : true, message : `task found is`, data})
        })
        .catch(err =>{
            // console.log(err);
            res.status(404).json({message : `data not found`})
        })
    }

    static editTask(req, res){
        let id = +req.params.id

        let data = {
            title : req.body.title,
            description : req.body.description,
            due_date : req.body.due_date
        }

        ToDo.update(data,{
            where : {id}
        }) 
        .then(data =>{
            res.status(200).json({success : true, message : `task is updated`, data}) 
        })
        .catch(err =>{
            console.log(err)
            let errMessage = []
            // for ( let i = 0; i < err.errors; i++){
            //     console.log(err.errors[i].ValidationErrorItem.message);
            // }
            
        })
    }


    static editStatus(req, res){
        let id = +req.params.id

        let status = req.body.status

        ToDo.update(status, {
            where : {id}
        })
        .then(data =>{
            res.status(200).json({success : true, message : `task is updated`, data}) 
        })

    }

    static delete(req, res){
        let id = +req.params.id

        ToDo.destroy(id)
        .then(data =>{
            res.status(200).json({success : true, message : `task is deleted`})
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({message : `internal server error`})
        })

    }
}

module.exports = ToDoController