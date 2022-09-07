const express = require('express');
const router = express.Router();
const {getAlltodos,addTodo,UpdateTodo,deleteTodo,getTodo} = require('../controllers/todo');
router.get('/',getAlltodos)
router.get('/:TodoId',getTodo)
router.post('/',addTodo)
router.patch('/:TodoId',UpdateTodo)
router.delete('/:TodoId',deleteTodo)

module.exports = router;