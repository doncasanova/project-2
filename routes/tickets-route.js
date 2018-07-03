var tickets_web_controller = require('../controllers/tickets-web-controller');
var express = require('express');
var router = express.Router();

router.get('/tickets', (req, res, next) => {
  console.log("inside tickets route ", req.query.user_id);
  req.session.user_id = req.query.user_id;
  req.session.email = req.query.email;
  req.session.displayName = req.query.displayName;
  req.session.user_identification = req.query.user_identification;
  tickets_web_controller.tickets(req, res)
});

module.exports = router;