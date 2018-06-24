// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

<<<<<<< HEAD
// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
=======
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// app.use(express.static("view"));
>>>>>>> 5fbd75421070bb6dd8c4f237bca1615fb31c4a09

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

<<<<<<< HEAD
// Static directory
app.use(express.static("public"));
=======
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./controllers/user-api-controller.js")(app);

>>>>>>> 5fbd75421070bb6dd8c4f237bca1615fb31c4a09

// Routes
// =============================================================
//require("./controllers/html-routes.js")(app);
require("./controllers/user-api-controller.js")(app);
//require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

