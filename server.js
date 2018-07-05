require('dotenv').config(); // load values into process.env
require('./configFile')(); // Set database connection properties
const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  path = require('path'),
  expressSession = require('express-session'),
  exphbs = require("express-handlebars");
  //sessionstorage = require('sessionstorage'),
  //sessionstore = require('sessionstore');



// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

app.use(expressSession({secret: 'superduperhidden', saveUninitialized: true, resave: false, cookie: {maxAge: 60000}}));
//app.use(express.session({store: sessionstore.createSessionStore()}));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Requiring our models for syncing
var db = require("./models");

app.use(passport.initialize());
app.use(passport.session());

// Parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Set Handlebars.

app.set('views', path.join (__dirname, 'views'));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
  // handlebars helper equal
  //exphbs.registerHelper('equal', require("handlebars-helper-equal"))

// controllers
var ticketsApiController = require('./controllers/tickets-api-controller');
// Routes
require('./routes/auth.js')(app, passport);
var indexRoutes = require('./routes/index-routes');
//var indexApiRoutes = require('./routes/index-api-routes');
var adminRoutes = require('./routes/admin/index-routes');
//var adminApiRoutes = require('./routes/admin/index-api-routes')(app);
var ticketsRoute = require('./routes/tickets-route');
var ticketsApiRoute = require('./routes/tickets-api-route');
var lookupEventsApiRoute = require('./routes/lookup_events-api-route');

// app.get('/', function(req, res) {res.render('admin')});

app.use(indexRoutes);
//app.use(indexApiRoutes);
app.use(adminRoutes);
app.use(ticketsRoute);
app.use(ticketsApiRoute);
app.use(lookupEventsApiRoute);
//app.use(adminApiRoutes);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({
  force: false
}).then(function () {
  if (!module.parent) {
      return app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
      });
  }
});


module.exports = app;
