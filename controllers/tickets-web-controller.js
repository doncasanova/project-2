var db = require('../models');
var Users = require('./user-data');
var Tickets = require('./tickets-data');

var exports = module.exports = {};

exports.tickets = function (req, res) {

    console.log('Inside tickets web controller :', req.session.displayName);
    var signedin_user = {
      "user_id": req.session.user_id,
      "email": req.session.email,
      "displayName": req.session.displayName,
      "user_identification": req.session.user_identification
    }

    var query = {};
    // check if "get by id" kind
    if (req.query.ticket_id) {
      query.ticket_id = req.query.ticket_id;
    }

    var lookupEvents;
    var ticketsWithUserIdAndEventId;
    var myTickets;
    var userInterests;
    var hbsObj;

    const dataForTiketsWeb = async (req, res, next) => {
      try {
        lookupEvents = await db.lookup_event.findAll();
        ticketsWithUserIdAndEventId = await db.ticket.findAll({
          where: query,
          include: [db.user, db.lookup_event]
        });
        myTickets = await db.ticket.findAll({
          where: {
            user_id: signedin_user.user_id
          },
          include: [db.user, db.lookup_event]
        });

        return hbsObj = {
          tickets: ticketsWithUserIdAndEventId,
          myTickets: myTickets,
          lookupEvents: lookupEvents,
          signedin_user: ''
        };
      } catch (err) {
        console.log(err.stack());
      }
    }

    dataForTiketsWeb();

    db.ticket.findAll({
        where: query,
        include: [db.user, db.lookup_event]
      })
      .then(function (dbTickets) {

        () => dbTickets;
        console.log("Tickets page - dbTickets \n", dbTickets);
        ticketsWithUserIdAndEventId = dbTickets;

        }).then(function () {

          db.ticket.findAll({
              where: {
                user_id: signedin_user.user_id
              },
              include: [db.user, db.lookup_event]
            })
            .then(function (dbMyTickets) {

              console.log("Tickets page - dbMyTickets \n", dbMyTickets);
              myTickets = dbMyTickets;
            })
            .then(function() {
              db.user_interest.findAll({
                where: {
                  user_id: signedin_user.user_id
                },
                include: [db.user, db.lookup_event]
              })
            })
            .then(function(dbUserInterests) {
              console.log("Tickets page - dbUserInterests \n", dbUserInterests);
              userInterests = dbUserInterests;
            })
              .then(function(){

                db.lookup_event.findAll({
              })
                .then(function (dbLookupEvents) {

                  console.log("Tickets page - dbLookupEvents \n", dbLookupEvents);
                  lookupEvents = dbLookupEvents;

                  var hbsObj = {
                    tickets: ticketsWithUserIdAndEventId,
                    myTickets: myTickets,
                    lookupEvents: lookupEvents,
                    userInterests: userInterests,
                    signedin_user: signedin_user
                  };
  
                  res.render('tickets', hbsObj);
              });           
            })
        })
      }












        // db.lookup_event.findAll()
        //   .then(lookupEvents => {
        //     console.log('Inside tickets web controoler lookupEvents ', lookupEvents);
        //     return lookupEvents;})
        //   .then(lookupEvents => function() {
        //     db.ticket.findAll({
        //       where: query,
        //       include: [db.user, db.lookup_event] }) 
        //     .then(function (dbTickets) {
        //       //console.log("Tickets page - ticket.findAll \n", dbTickets);

        //       myTickets = dbTickets.filter(t => t.user.displayName === signedin_user.displayName );
        //       console.log('Inside tickets web controller myTickets :', myTickets);

        //       var hbsObj = {
        //         tickets: dbTickets,
        //         myTickets: myTickets,
        //         lookupEvents: lookupEvents,
        //         signedin_user: signedin_user
        //       };

        //       //console.log("Tickets page - ready hlbobj \n", hbsObj);
        //       res.render('tickets', hbsObj);
        //     });
        //   })


        // db.ticket.findAll({
        //   where: query,
        //   include: [db.user, db.lookup_event] }) 
        // .then(function (dbTickets) {
        //   //console.log("Tickets page - ticket.findAll \n", dbTickets);

        //   myTickets = dbTickets.filter(t => t.user.displayName === signedin_user.displayName );
        //   console.log('Inside tickets web controller myTickets :', myTickets);

        //   var hbsObj = {
        //     tickets: dbTickets,
        //     myTickets: myTickets,
        //     lookupEvents: lookupEvents,
        //     signedin_user: signedin_user
        //   };

        //   //console.log("Tickets page - ready hlbobj \n", hbsObj);
        //   res.render('tickets', hbsObj);
        // });

        // myTickets = dbTickets.filter(t => t.user.displayName === signedin_user.displayName );
        // console.log('Inside tickets web controller myTickets :', myTickets);

        // var hbsObj = {
        //   tickets: dbTickets,
        //   myTickets: myTickets,
        //   lookupEvents: lookupEvents,
        //   signedin_user: signedin_user
        // };

        // //console.log("Tickets page - ready hlbobj \n", hbsObj);
        // res.render('tickets', hbsObj);

        // var myTickets = ticketsWithUserIdAndEventId.filter(t => t.user.displayName === signedin_user.displayName );
        //console.log('Inside tickets web controller myTickets :', myTickets);

        // hbsObj = {
        //   tickets: ticketsWithUserIdAndEventId,
        //   myTickets: myTickets,
        //   lookupEvents: lookupEvents,
        //   signedin_user: signedin_user
        // };