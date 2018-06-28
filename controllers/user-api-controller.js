var db = require('../models');
var exports = module.exports = {};

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findAll({
      include: [db.User]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

// test added by don casanova
  app.get("/", function(req, res) {
  
    res.render("index");
  });


}

