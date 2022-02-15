//const db = require("../models");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.User;

const Op = db.Sequelize.Op;

exports.createuser = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,

  })
    .then(user => {
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
          });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

 // delete user from database
exports.deleteuser = (req, res) => {
    const username = req.params.username
    const email= req.params.email
  

User.destroy({
      where: { username: username, email:email }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with username=${username}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user"
        });
      });
  };
