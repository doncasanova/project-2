var db = require('../models');

var exports = module.exports = {};

exports.userCreate = function (userinfo) {
  console.log(userinfo);

  db.user.create(userinfo)
      .then(dbUser => console.log(dbUser));
};
