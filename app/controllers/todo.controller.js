const db = require("../models/index");

const Tag = db.tag;
const Todo = db.todo;



//Create and Save new Todo

exports.createTodo = (todo) => {
  return Todo.create({
    title: todo.title,
    description: todo.description,
    due_at: todo.due_at,
  })
    .then((todo) => {
      console.log(">> Created Todo: " + JSON.stringify(todo, null, 4));
      return todo;
    })
    .catch((err) => {
      console.log(">> Error while creating Todo: ", err);
    });
};

//Retrieve all TODOs

exports.findAllTodo = () => {
  return Todo.findAll({
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
      return todos;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Todos: ", err);
    });
}

//Get the Todo for a given todo id

exports.findTodoById = (id) => {
  return Todo.findByPk(id, {
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
        // through: {
        //   attributes: ["tag_id", "todo_id"],
        // },
      },
    ],
  })
    .then((todo) => {
      return todo;
    })
    .catch((err) => {
      console.log(">> Error while finding Todo: ", err);
    });
};

exports.createTag = (tag) => {
  return Tag.create({
    name: tag.name,
  })
    .then((tag) => {
      console.log(">> Created Tag: " + JSON.stringify(tag, null, 2));
      return tag;
    })
    .catch((err) => {
      console.log(">> Error while creating Tag: ", err);
    });
};


//Find all Tags

exports.findAllTags = () => {
return Tag.findAll({
  include: [
    {
      model: Todo,
      as: "todos",
      attributes: ["id", "title", "description", "due_at"],
      through: {
        attributes: [],
      }
    },
  ],
})
  .then((tags) => {
    return tags;
  })
  .catch((err) => {
    console.log(">> Error while retrieving Tags: ", err);
  });
};

//Add a Todo to a Tag

exports.addTodo = (tagId, todoId) => {
return Tag.findByPk(tagId)
  .then((tag) => {
    if (!tag) {
      console.log("Tag not found!");
      return null;
    }
    return Todo.findByPk(todoId).then((todo) => {
      if (!todo) {
        console.log("Todo not found!");
        return null;
      }

      tag.addTodo(todo);
      console.log(`>> added Todo id=${todo.id} to Tag id=${tag.id}`);
      return tag;
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Todo to Tag: ", err);
  });
};