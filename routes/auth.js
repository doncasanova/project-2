const GoogleStrategy = require('passport-google-oauth2').Strategy;
const auth_controller = require('../controllers/auth-controller');

module.exports = (app, passport) => {

  app.get('/auth/google/callback',
      passport.authenticate('google', {
          failureRedirect: '/signin'
      }),
      (req, res) => {
        // req.session.token = req.user.token;
        // console.log('user token ', req.user.token);
        console.log('user profile ', req.user.profile);
        console.log('user email ', req.user.profile.email);
        var user = {
          first_name: req.user.profile.name.givenName,
          last_name: req.user.profile.name.familyName,
          email: req.user.profile.email,
          user_identity: req.user.profile.id
        };

        if (!auth_controller.userGetById) {
          auth_controller.userCreate(user);
        }
        res.redirect('/');
      }
  );

  // generate a url that asks permissions for Google+ and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'email'
   ];

  /*
  scope: ['https://www.googleapis.com/auth/plus.signin',
   'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/calendar', 
    'https://www.googleapis.com/auth/plus.profile.email']
  */

  app.get('/auth/google', passport.authenticate('google', {
      scope: scopes
    })
  );

  app.get('/signin', (req, res) => {
    res.render('signin', { user: req.user});
  })

  app.get('/signout', (req, res) => {
    req.signout();
    req.session = null;
    res.redirect('/');
  })

// Route to landing page
//app.get('/', (req, res) => res.sendFile('donlandingpage', { user: req.user, root : __dirname}));
app.get('/', (req, res) => {
  // if (req.session.token) {
  //     res.cookie('token', req.session.token);
  //     res.json({
  //         status: 'session cookie set'
  //     });
  // } else {
  //     res.cookie('token', '')
  //     res.json({
  //         status: 'session cookie not set'
  //     });
  // }
  res.render('../views/index', { user: req.user, root : __dirname})
});

app.get('/', ensureAuthenticated, (req, res) => {
  res.render('/', {user: req.user});
})

  passport.serializeUser((user, done) => {
    var sessionUser = {_id: user._id, 
                                  name: user.name,
                                  email: user.email,
                                  roles: user.roles };
      done(null, sessionUser);
  });

  //The sessionUser is different from database user. it's actually req.session.passport.user and comes from the session collection
  passport.deserializeUser((sessionUser, done) => {
      done(null, sessionUser);
  });

  passport.use(new GoogleStrategy({
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: '/auth/google/callback',
          passReqToCallback : true
      },
      (request, accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
          return done(null, {
              profile: profile,
              accessToken: accessToken
          });
        });    
      }));  
  
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/signin');
  }
};