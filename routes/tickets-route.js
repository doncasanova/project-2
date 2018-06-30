var tickets_controller = require('../controllers/tickets-controller');
var express = require('express');
var router = express.Router();

router.get('/tickets', (req, res) => tickets_controller.tickets);

module.exports = router;