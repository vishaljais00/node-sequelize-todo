//importing modules
const express = require("express");
const todoController = require("../controllers/todoController");
const router = express.Router();
const { taskValidationRules, validate } = require('../validator/taskValidation')


//admin routes
router
  	.route("/")
		.post(taskValidationRules('add_todo'), validate, todoController.createTodo) 
		.get(todoController.getAllTodo) 
		.put(taskValidationRules('update_todo'), validate, todoController.UpdateTodo) 
		.delete(taskValidationRules('delete_todo'), validate, todoController.deleteTodo) 

router	
	.route("/:id")
		.get(taskValidationRules('get_single_todo'), validate ,todoController.GetOneTodo) 
	



module.exports = router;