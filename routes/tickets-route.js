var tickets_web_controller = require('../controllers/tickets-web-controller');
var express = require('express');
var router = express.Router();

router.get('/tickets', (req, res) => tickets_web_controller.tickets(req, res));

module.exports = router;