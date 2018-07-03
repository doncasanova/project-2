var db = require('../models');
var Users = require('./user-data');
var Tickets = require('./tickets-data');
var exports = module.exports = {};

// respond to GET /api/tickets
exports.ticketsAll = function (req, res) {
  var query = {};

  // check if "get by id" kind
  if (req.query.ticket_id) {
    query.ticket_id = req.query.ticket_id;
  }

  db.ticket.findAll({
        where: query,
        include: [db.user] }) 
      .then(function (dbTicket) {
    res.json(dbTicket);
  });
};


exports.ticketsByQueryParam = function(req, res) {
  var tickets = new Tickets();
  var queryParam = {};
  if (req.query.ticket_id) {
    queryParam.ticket_id = req.query.ticket_id;
  }
  if (req.query.ticket_name) {
    queryParam.ticket_name = req.query.ticket_name;
  }
  if (req.query.location) {
    queryParam.location = req.query.location;
  }
  
  tickets.getTicketsByQueryParam(queryParam)
    .then(dbTickets => {
      res.json(dbTickets)
    });
}


// respont to GET /api/tickets/:id
exports.ticketById = function (req, res) {
  db.ticket.findOne({
    where: {
      ticket_id: req.params.id
    },
    include: [db.user] })
    .then(function (dbTicket) {
      res.json(dbTicket);
    });
}

// respond to POST /api/tickets
exports.ticketCreate = function (req, res) {
  var user = new Users();
  var u = user.getUserByEmail(req.body.email);
  var user_id = u.userSelected.user_id;
  req.body.user_id = user_id;
  db.ticket.create(req.body)
      .then(dbTicket => res.json(dbTicket));
};

// respond to PUT /api/tickets
exports.ticketUpdate = function (req, res) {
  db.ticket.update(
    req.body, 
    {
      where: {
        ticket_id: req.body.id
      }
    }).then(function(dbTicket) {
      res.json(dbTicket);
    });
  };

// respond to DELETE /api/tickets/:id
exports.ticketDelete = function (req, res) {
  db.ticket.destroy({
    where: {
      ticket_id: req.params.id
    }
  }).then(dbTicket => res.json(dbTicket));
}


