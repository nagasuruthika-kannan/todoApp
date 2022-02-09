module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    due_at: {
      type: DataTypes.DATEONLY            
    },
  });

  return Todo;
};
