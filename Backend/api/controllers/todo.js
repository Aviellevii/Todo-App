const mongoose = require('mongoose');
const Todo = require('../models/todo');

module.exports = {
    getAlltodos:(req,res) => {
        Todo.find({_userId:req.user.id}).then((post)=>{
            res.send(post)
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })
    },
    getTodo:(req,res)=>{
        const TodoId = req.params.TodoId;

        Todo.findOne({_id:TodoId,_userId:req.user.id}).then((todo) => {
            res.send(todo)
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })
       
    },
    addTodo:(req,res) => {
        const {title,body} = req.body;

        let newTodo = new Todo({
            title,
            body,
            _userId:req.user.id
        })
        newTodo.save().then((todo)=>{
            res.send(todo)
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })
    },
    UpdateTodo:(req,res)=>{
        const TodoId = req.params.TodoId;
        Todo.findOneAndUpdate(
            {_id:TodoId,_userId:req.user.id},{$set:req.body}
            ).then(() => res.json({message:'Updated'})).catch(error =>{
                res.status(500).json({
                    error
                })
            })
        

    },
    deleteTodo:(req,res)=>{
        const TodoId = req.params.TodoId;
       Todo.findOneAndRemove({_id:TodoId,_userId:req.user.id}).then((Todoremoved) => {
        res.send(Todoremoved)
       }).catch(error =>{
        res.status(500).json({
            error
        })
    })
    }
}