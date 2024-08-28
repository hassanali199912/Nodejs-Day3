const express = require("express");
const router = express.Router();
const todosControllers = require("../controllers/todos");

router.get("/", todosControllers.getAll);
router.get("/:id", todosControllers.findOne);
router.post("/", todosControllers.createTodo);
router.put("/:id", todosControllers.updateTodo);
router.delete("/:id", todosControllers.deleteTodo);

module.exports = router;
