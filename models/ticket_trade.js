var Ticket = require('./ticket');
module.exports = function(sequelize, DataTypes) {
  var TicketTrade = sequelize.define("ticket_trade", {
    ticket_trade_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true   
    },

    ticket_for_bid_user: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    bid_status: {
      type: DataTypes.ENUM('in_pool', 'trade_progress', 'claimed'),
      defaultValue: 'in_pool'
    },

    bid_time: {
      type: DataTypes.DATE,
      allowNull: true
      //defaultValue: CURRENT_TIMESTAMP
    },

    ticket_to_bid_user: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });


  TicketTrade.associate = function(models) {

    //foreign key ticket_for_bid_id is added to ticket_trade table
    TicketTrade.belongsTo(models.ticket, {
      //as: 'forBidTicket',
      foreignKey: 'ticket_for_bid_id',
      targetKey: 'ticket_id',
      allowNull: false
    });

    //foreign key ticket_to_bid_id is added to ticket_trade table
    TicketTrade.belongsTo(models.ticket, {
      //as: 'toBidTicket', 
      foreignKey: 'ticket_to_bid_id',
      targetKey: 'ticket_id',
      allowNull: true
    });

    // TicketTrade.belongsToMany(models.ticket, {
    //   as: 'tickets_for_bid', 
    //   foreignKey: 'bid_ticket_id',
    //   through: models.ticket_trade
    // });

    // TicketTrade.belongsToMany(models.ticket, {
    //   as: 'ticketsForBid', 
    //   foreignKey: 'ticketForBidId',
    //   through: models.ticketsPool
    // });
  }

  return TicketTrade;
}