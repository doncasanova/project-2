// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// ===============================================
const express = require("express"),
      bodyParser = require("body-parser"),
      passport = require("passport"),
      cookieParser = require("cookie-parser"),
      session = require("express-session"),
      cookieSession = require("cookie-session")
      //RedisStore = require('connect-redis')(session);

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport does not directly manage your session, it only uses the session.
// So you configure session attributes (e.g. life of your session) via express
var sessionOptions = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  store: sessionStore,
  secret: config.session.secret,
  cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}

app.use(cookieParser(config.session.secret));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());


// app.use(cookieSession({
//   name: 'session',
//   keys: ['SECRECT KEY'],
//   maxAge: 24 * 60 * 60 * 1000
// }));
// Initialize authenticaton 
// app.use(session({ 
// 	secret: 'cookie_secret',
// 	name:   'kaas',
// 	store:  new RedisStore({
// 		host: '127.0.0.1',
// 		port: 6379
// 	}),
// 	proxy:  true,
//     resave: true,
//     saveUninitialized: true
// }));


// Sets up the Express app to handle data parsing




// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require("./controllers/html-routes.js")(app);
require("./controllers/user-api-controller.js")(app);
//require("./routes/post-api-routes.js")(app);

// Route to auth
var authRoute = require('./routes/auth.js')(app, passport);

// Requiring our models for syncing
var db = require("./models");

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

/* may use
hbsEngine.init(app)
routes.init(app)    
app.listen(config.port, function() {})

*/

