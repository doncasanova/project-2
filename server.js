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

// Requiring our models for syncing
var db = require("./models");

// app.use(cookieParser());
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
// 	proxy:  true,//
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// Sets up the Express app to handle data parsing
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require("./controllers/html-routes.js")(app);
require("./controllers/user-api-controller.js")(app);
//require("./routes/post-api-routes.js")(app);

// Route to auth
var authRoute = require('./routes/auth.js')(app, passport);
// Route to landing page
//app.get('/', (req, res) => res.sendFile('donlandingpage', { user: req.user, root : __dirname}));
// app.get('/', (req, res) => {
//   if (req.session.token) {
//       res.cookie('token', req.session.token);
//       res.json({
//           status: 'session cookie set'
//       });
//   } else {
//       res.cookie('token', '')
//       res.json({
//           status: 'session cookie not set'
//       });
//   }
//   res.sendFile('donlandingpage', { user: req.user, root : __dirname})
// });

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

