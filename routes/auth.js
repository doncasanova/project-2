const GoogleStrategy = require('passport-google-oauth2').Strategy;
const Users = require('../controllers/user-data');
const express = require('express');
const session = require('express-session');
const path = require('path');
//console.log(process.env.CLIENT_ID);

module.exports = (app, passport) => {

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/signin'
    }), (req, res) => {
      // req.session.token = req.user.token;
      // console.log('user token ', req.user.token);
      console.log('user profile ', req.user.profile.displayName);
      //console.log('user email ', req.user.profile.email);

      var userInfo = {
        first_name: req.user.profile.name.givenName,
        last_name: req.user.profile.name.familyName,
        email: req.user.profile.email,
        user_identity: req.user.profile.id, 
        displayName: req.user.profile.displayName
      }

      console.log(userInfo);
      // check if user alreay in database
      //app.use(session({secret: 'super duper hidden', cookie: {maxAge: 60000}}));
      var sessionData = req.session;
      var users = new Users();

      users.getUserByUserIdentity(req.user.profile.id)
        .then(dbUser => {
          if (!users.userSelected) {
            users.getUserByEmail(req.user.profile.eamil)
              .then(dbUser => {
                if (!users.userSelected) {
                  users.createUser(userInfo)
                    .then(dbUser => {
                      setSessionInfo(sessionData, users.userInserted);
                    })
                } 
                else{
                  setSessionInfo(sessionData, users.userSelected);
                }
              })
          } else{
            setSessionInfo(sessionData, users.userSelected);
          }
        })

      res.redirect('/tickets');
      //router.get('/tickets', (req, res) => tickets_controller.tickets(req, res));
      //router.get('/api/tickets', (req, res) => tickets_api_controller.ticketsAll(req, res));
      //res.sendFile(path.join(__dirname + '/test.html'));
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
  }));

  app.get('/signin', (req, res) => {
    res.render('signin', {
      user: req.user
    });
  })

  app.get('/signout', (req, res) => {
    req.signout();
    req.session = null;
    res.redirect('/');
  })

  // Route to landing page
  //app.get('/', (req, res) => res.sendFile('donlandingpage', { user: req.user, root : __dirname}));
  app.get('/', (req, res) => {
    res.render('../views/index', {
      user: req.user,
      root: __dirname
    })
  });

  app.get('/', ensureAuthenticated, (req, res) => {
    res.render('/', {
      user: req.user
    });
  })

  passport.serializeUser((user, done) => {
    var sessionUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles
    };
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
      passReqToCallback: true
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
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/signin');
  }

  function setSessionInfo(sessionData, dataObj) {
    sessionData.user_id = dataObj.user_id;
    sessionData.email = dataObj.email.toString();
    sessionData.user_identity = dataObj.user_identity.toString();                  
    sessionData.displayName = dataObj.displayName.toString();
    console.log("sessionData: \n", sessionData);
  }


};