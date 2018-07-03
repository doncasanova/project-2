var tickets_api_controller = require('../controllers/tickets-api-controller');
var express = require('express');
var router = express.Router();

router.get('/api/tickets', (req, res) => tickets_api_controller.ticketsAll(req, res));

router.post('/api/tickets', (req, res) => tickets_api_controller.ticketCreate(req, res));

router.get('/api/tickets/:id', (req, res) => tickets_api_controller.ticketById(req, res));

router.put('/api/tickets', (req, res) => tickets_api_controller.ticketUpdate(req, res));

router.delete('/api/tickets/:id', (req, res) => tickets_api_controller.ticketDelete(req, res));

module.exports = router;