var db = require("../models");
console.log("you are in the user-api-controller.js")
module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findAll({
      include: [db.Post]
    }).then(function(dbUSer) {
      res.json(dbUSer);
    });
  });

// test added by don casanova
  app.get("/", function(req, res) {
  
    res.render("index");
  });


}

