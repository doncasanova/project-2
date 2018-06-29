require('dotenv').config(); // load values into process.env
const express = require("express"),
      bodyParser = require("body-parser")
      passport = require("passport");
      // cookieParser = require("cookie-parser"),
      // //session = require("express-session"),
      // cookieSession = require("cookie-session")
      //RedisStore = require('connect-redis')(session);

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Set database connection properties
var config = require('./config/config.json');
config.development.PORT = process.env.MYSQL_PORT;
config.development.username = process.env.MYSQL_ROOT_USERNAME;
config.development.password = process.env.MYSQL_ROOT_PASSWORD;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Requiring our models for syncing
var db = require("./models");

app.use(passport.initialize());
app.use(passport.session());

// Parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require('./routes/auth.js')(app, passport);
require('./routes/index-routes')(app);
require('./routes/index-api-routes')(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

