const db = require("../models/index");

const Tag = db.tag;
const Todo = db.todo;



//Create and Save new Todo

exports.createTodo = (req,res) => {
  Todo.create({
    title: req.body.title,
    description: req.body.description,
    due_at: req.body.due_at,
  })
    .then((todo) => {
      console.log(">> Created Todo: " + JSON.stringify(todo, null, 4));
      res.send(todo);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating todo"
      });
    });
};

//Retrieve all TODOs

exports.findAllTodo = (req, res) => {
  Todo.findAll({
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((todos) => {
      res.send(todos);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while retrieving todo"
      });
    });
}

//Get the Todo for a given todo id

exports.findTodoById = (req,res) => {
  const id = req.params.id;
  Todo.findByPk(id, {
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      
      },
    ],
  })
    .then((todo) => {
      res.send(todo);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving todo with id = ${id}`
      });
    });
};

//update a todo by the id in request

exports.updateTodo = (req,res) => {
  const id = req.params.id;
  Todo.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Todo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating todo with id=" + id
      });
    });
};

// Delete a todo with the specified id in the request

exports.deleteTodo = (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete todo with id=${id}. Maybe todo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete todo with id=" + id
      });
    });
};


//create tags

exports.createTag = (req,res) => {
  Tag.create({
    name: req.body.name,
  })
    .then((tag) => {
      res.send({
        message: "Tag was created successfully!"
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating tag"
      });
    });
};


//Find all Tags/ where condition: name

exports.findAllTags = (req,res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

Tag.findAll({
  where: condition,
  include: [
    {
      model: Todo,
      as: "todos",
      attributes: ["id", "title", "description", "due_at"],
      
      through: {
        attributes: [],
      },
    
      
    },
  ],
})
  .then((tags) => {
    res.send(tags);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving tags"
    });
  });
};

//Add a Todo to a Tag

exports.addTodo = (res, req) => {
  const tagId = req.body.tagId;
  const todoId= req.body.todoId;
  Tag.findByPk(tagId)
  .then((tag) => {
    if (!tag) {
      res.send({
        message: "Tag not found!"
      });
    }
  Todo.findByPk(todoId).then((todo) => {
      if (!todo) {
        //console.log("Todo not found!");
        res.send({
          message: "Todo not found!"
        });
        
      }

      tag.addTodo(todo);
      
      //console.log(`>> added Todo id=${todo.id} to Tag id=${tag.id}`);
      res.send(tag);
    });
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error occurred while adding todo to tag"
    });
  });
};