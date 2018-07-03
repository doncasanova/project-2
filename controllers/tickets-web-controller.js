var exports = module.exports = {};

exports.tickets = function (req, res) {
  res.render('tickets', {layout: 'main'});
}