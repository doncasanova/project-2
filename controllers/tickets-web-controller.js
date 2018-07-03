var db = require('../models');
var Users = require('./user-data');
var Tickets = require('./tickets-data');

var exports = module.exports = {};

exports.tickets = function (req, res) {
  
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

    var hbsObj = {
      tickets: dbTickets
    };

    //console.log("Tickets page - ready hlbobj \n", hbsObj);
    res.render('tickets', hbsObj);
  });
}

