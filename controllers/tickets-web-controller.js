var db = require('../models');
var Users = require('./user-data');
var Tickets = require('./tickets-data');

var exports = module.exports = {};

exports.tickets = function (req, res) {
  
  console.log('Inside tickets web controller :', req.session.displayName);
  var user = {
    "user_id": req.session.user_id,
    "email": req.session.email,
    "displayName": req.session.email,
    "user_identification": req.session.user_identification
  }

  var query = {};
  // check if "get by id" kind
  if (req.query.ticket_id) {
    query.ticket_id = req.query.ticket_id;
  }

  db.ticket.findAll({
    where: query,
    include: [db.user] }) 
  .then(function (dbTickets) {
    //console.log("Tickets page - ticket.findAll \n", dbTickets);
    var ts = [
      {"user": user}, 
      {"allT": dbTickets}
    ];

    var tts = [user, dbTickets];

    var hbsObj = {
      tickets: dbTickets,
      user: user
    };

    //console.log("Tickets page - ready hlbobj \n", hbsObj);
    res.render('tickets', hbsObj);
  });
}

