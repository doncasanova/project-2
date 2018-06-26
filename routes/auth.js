const GoogleStrategy = require('passport-google-oauth2').Strategy;
const googlePassport = require('../.token');

module.exports = (app, passport) => {

  app.get('/auth/google/callback',
      passport.authenticate('google', {
          failureRedirect: '/login'
      }),
      //(req, res) => {}
      (req, res) => {
        req.session.token = req.user.token;
        console.log('user token ', req.user.token);
        console.log('user profile ', req.user.profile);
        res.redirect('/');
      }
  );

  app.get('/auth/google', passport.authenticate('google', {
    // scope: ['https://www.googleapis.com/auth/plus.login',
    //   'https://www.googleapis.com/auth/plus.profile.email']
      scope: ['https://www.googleapis.com/auth/userinfo.profile']
    })
  );

  app.get('/login', (req, res) => {
    res.render('login', { user: req.user});
  })

  app.get('/logout', (req, res) => {
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
          clientID: googlePassport.CLIENT_ID,
          clientSecret: googlePassport.CLIENT_SECRET,
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
    res.redirect('/login');
  }
};