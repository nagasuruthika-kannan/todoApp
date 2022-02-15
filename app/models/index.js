const dbConfig = require("../config/db.config.js");

const { Sequelize, Op} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.todo = require("./todo.model")(sequelize, Sequelize);
db.tag = require("./tag.model")(sequelize, Sequelize);
db.User = require("./user.model")(sequelize, Sequelize);
db.tag.belongsToMany(db.todo, {
  through: "todo_tag",
  as: "todos",
  foreignKey: "tag_id",
});
db.todo.belongsToMany(db.tag, {
  through: "todo_tag",
  as: "tags",
  foreignKey: "todo_id",
});



module.exports = db;
