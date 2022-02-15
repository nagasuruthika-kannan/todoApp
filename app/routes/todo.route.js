module.exports = app => {
    const todoController = require("../controllers/todo.controller");
    const auth = require("../middleware/auth");
  
    const router = require("express").Router();
  
    // Create a new Todo
    router.post("/",auth, todoController.createTodo);
  
    // Retrieve all todos
    router.get("/", auth, todoController.findAllTodo);
  
    // Retrieve a single todo with id
    router.get("/:id",auth,todoController.findTodoById);
  
    // Update a todo with id
    router.patch("/:id",auth, todoController.updateTodo);
  
    // Delete a todo with id
    router.delete("/:id",auth, todoController.deleteTodo);

    //create a new tag 
    router.post("/tag", auth,todoController.createTag);

    // Retrieve all tags
    router.get("/tag/:name", auth,todoController.findAllTags);

    router.post("/addtag", auth,todoController.addTodo)


  

  
    app.use("/api/todo", router);
  };