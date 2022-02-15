const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');

const db = require("./app/models");
//const controller = require("./app/controllers/todo.controller");

// create express app
const app = express();

// swagger config
const swaggerUi = require("swagger-ui-express"),
  swaggerDoc = require("./swagger.json");

// Setup server port
const port = process.env.PORT || 8080;

db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("App is live");
});


// api routes
require("./app/routes/todo.route")(app);
require("./app/routes/auth.routes")(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));



// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
db.sequelize.sync();






/** 
const run = async () => {
  const todo1 = await controller.createTodo({
    title: "Todo#1",
    description: "Todo#1 Description",
    due_at: "2022-02-08",
  });

  const todo2 = await controller.createTodo({
    title: "Todo#2",
    description: "Todo#2 Description",
    due_at: "2022-02-08",
  });
  const tag1 = await controller.createTag({
    name: "Tag#1",
  });
  const tag2 = await controller.createTag({
    name: "Tag#2",
  });
  await controller.addTodo(tag1.id, todo1.id);
// >> added Todo id=1 to Tag id=1
await controller.addTodo(tag1.id, todo2.id);
// >> added Todo id=2 to Tag id=1
await controller.addTodo(tag2.id, todo1.id);
// >> added Todo id=1 to Tag id=2

const tags = await controller.findAllTags();
console.log(">> tags", JSON.stringify(tags, null, 2));

const todos = await controller.findAllTodo();
console.log(">> tuts", JSON.stringify(todos, null, 2));
  

};

db.sequelize.sync();
/**db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  });
  */


