const controller = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });
  //create user
  app.post("/api/auth/createuser",controller.createuser);

  //delete user
  app.delete("/api/auth/deleteuser",auth, controller.deleteuser)


};
