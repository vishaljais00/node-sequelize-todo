const { Op } = require("sequelize");
const db = require("../Models");
const { responseSuccess, responseError } = require("../helper/responce");

// declaring the usermodel
const Todos = db.todos;


// create toto 
exports.createTodo = async (req, res) => {
  try {

    const {task, due_date, priority, status } = req.body
    let todoData = await Todos.create({
      task, due_date, priority, status
    })
    return responseSuccess(res, 'todo created', todoData)
  } catch (error) {
    console.log("error", error)
    return responseError(res, 'todo creation failed', 400)
  }
};

// get all toto list

exports.getAllTodo = async (req, res) => {
  try {
    const {status} = req.query

    let whereClause = {}
    if(status){
      whereClause.status = 'Done'
    }else{
      whereClause = {
        status: { [Op.ne]: 'Done' },
      }
    }


    let todoData = await Todos.findAll({
      where: whereClause,
      order: [['todo_id', 'DESC']]
    })
    if (!todoData.length)  return responseSuccess(res, 'empty todod list', todoData)
    return responseSuccess(res, 'todo list', todoData)
  } catch (error) {
    console.log("error", error)
    return responseError(res, 'todo fetch failed', 400)
  }
};

// get one toto

exports.GetOneTodo = async (req, res) => {
	try {
	  let todoData = await Todos.findOne({where:{
      todo_id: req.params.id
	  }});

    if(!todoData) return responseSuccess(res, 'todo not found')
	  return responseSuccess(res, 'todo', todoData)
	} catch (error) {
	  return responseError(res, 'todo fetch failed', 400)
	}
  };


// update toto

exports.UpdateTodo = async (req, res) => {
  try {
    const {todo_id, task, due_date, status, priority } = req.body
    const todoData = await Todos.findOne({where:{
      todo_id: todo_id
      }});
  
      if(!todoData) return responseError(res, 'todo not found', 404)
    await todoData.update({task, due_date, status, priority });
    return  responseSuccess(res, 'todo updated')

  } catch (error) {
    console.log("error", error)
    return responseError(res, 'todo updataion failed', 400)
  }
};

// deleted toto

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.query;
    const todoData = await Todos.findOne({where:{
      todo_id: id   
      }});
  
    if(!todoData) return responseError(res, 'todo not found', 404)
    await todoData.destroy();
    return  responseSuccess(res, 'todo deleted')
  } catch (error) {
    return responseError(res, 'todo deletion failed', 400)
  }
};
