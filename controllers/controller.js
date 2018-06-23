
//--------------------------------------------------------------
var express = require("express");
console.log("contorller")
// var router = express.Router();
var db = require("../models/index");
// create routes
//---------------------------------
// Sends to DOM
// router.get("/", function (req, res) {
//   burgers.selectAll(function (data) {
//     res.render('index', { burgers: data });
//   });
// });

// //Create a New Burger
// router.post('/burger/create', function (req, res) {
//   burgers.insertOne(req.body.burger, function () {
//      res.redirect("/");
//   });
// });

// //Devour a Burger
// router.put('/burger/eat/:id', function (req, res) {
//   burgers.updateOne(req.params.id, function () {
//     res.render('index');
//   });
// });
// 
//---------------------------------------------------

//Export routes
// module.exports = router;