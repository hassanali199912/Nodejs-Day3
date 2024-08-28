const Todos = require("../modules/todos");
const token = require("jsonwebtoken");
const getAll = async (req, res, next) => {
  try {
    const todo = await Todos.find().populate("user", "-password");
    // const counDoc = todo.lenght;
    const counDoc = await Todos.find().countDocuments();

    res.status(200).json({
      message: "Data Fatched Successfuly",
      count: counDoc,
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
    //next();
  }
};
const createTodo = async (req, res, next) => {
  try {
    const title = req.body.title;
    const token_user = req.headers?.authorization?.split(" ")[1];
    if (!token_user) {
      res.status(301).json({
        message: "Unauthrized",
      });
    } else {
      const decode = token.verify(token_user, "thisIsMySecret");

      const task = new Todos({
        ...req.body,
        user: decode.userId,
      });

      await task.save();
      const getAll = await Todos.find().populate("user", "-password");
      const counDoc = await Todos.find().countDocuments();
      res.status(200).json({
        message: "Task Created Successfuly",
        count: counDoc,
        getAll,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
    //next();
  }
};
const updateTodo = async (req, res, next) => {
  try {
    const taskid = req.params.id;

    const taskUpdaate = await Todos.findByIdAndUpdate(
      taskid,
      {
        title: req.body.title,
        state: req.body.state,
      },
      { new: true }
    );

    await taskUpdaate.save();
    const tasks = await Todos.find().populate("user", "-password");
    const counDoc = await Todos.find().countDocuments();
    res.status(200).json({
      message: "Task Updated Successfuly",
      count: counDoc,
      tasks: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
    //next();
  }
};
const deleteTodo = async (req, res, next) => {
  try {
    const deleteTask = await Todos.findByIdAndDelete(req.params.id);

    const tasks = await Todos.find().populate("user", "-password");
    const counDoc = await Todos.find().countDocuments();

    res.status(200).json({
      message: "Task Deleted Successfuly",
      count: counDoc,
      tasks: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
    //next();
  }
};

const findOne = async (req, res, next) => {
  try {
    const getTask = await Todos.findById(req.params.id);

    if (!getTask) {
      res.status(404).json({
        message: "Data Not Found",
      });
    } else {
      res.status(200).json({
        message: "Task Deleted Successfuly",
        task: getTask,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
    //next();
  }
};

module.exports = {
  getAll,
  createTodo,
  updateTodo,
  deleteTodo,
  findOne,
};
