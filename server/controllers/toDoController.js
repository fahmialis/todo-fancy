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
            res.status(500).json({message : `${err}`})
        })
    }

    static read(req, res){
        // res.send('get data')
        ToDo.findAll({where : {
            status : 'on progress'
        }})
        .then(data =>{
            res.status(200).json({success : true, message : `data found is`, data})
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json
        })

    }

    static findById(req, res){
        // res.send(`find id : ${+req.params.id}`)
        let id = +req.params.id

        ToDo.findByPk(id)
        .then(data =>{
            res.status(200).json({success : true, message : `data found is`, data})
        })
        .catch(err =>{
            console.log(err);
            res.status(404).json({message : `error not found`})
        })
    }

}

module.exports = ToDoController