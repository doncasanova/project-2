const GoogleStrategy = require('passport-google-oauth2').Strategy;
//require('dotenv').config(); 

console.log('CLIENT_ID ', process.env.CLIENT_ID);

module.exports = (app, passport) => {

  app.get('/auth/google/callback',
      passport.authenticate('google', {
          failureRedirect: '/signin'
      }),
      //(req, res) => {}
      (req, res) => {
        req.session.token = req.user.token;
        console.log('user profile ', req.user.profile);
        //console.log('user email', req.user.email);
        res.redirect('/');
      }
  );

  // generate a url that asks permissions for Google+ and Google Calendar scopes
  const scopes = [
    //'https://www.googleapis.com/auth/plus.me',
    //'https://www.googleapis.com/auth/calendar', 
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'email'
   ];

  app.get('/auth/google', passport.authenticate('google', {
    scope: scopes
  })
);

  app.get('/signin', (req, res) => {
    res.render('signin', { user: req.user});
  })

  app.get('/signout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
  })

  app.get('/', ensureAuthenticated, (req, res) => {
    res.render('/', {user: req.user});
  })

  app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});



  passport.serializeUser((user, done) => {
      done(null, user);
  });

  passport.deserializeUser((obj, done) => {
      done(null, obj);
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