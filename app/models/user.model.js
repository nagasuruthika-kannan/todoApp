module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user", // Model name
      {
        username: {
          type: DataTypes.STRING,
          unique: true
        },
        email: {
          type: DataTypes.STRING
        },
        
      },
    );
  
    return User;
  };
 
  