module.exports = function(sequelize, DataTypes) {
  var Ticket = sequelize.define("ticket", {
    ticket_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true   
    },

    ticket_name: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    location: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    season_start: {
      type: DataTypes.DATE,
      allowNull: true
    },

    season_end: {
      type: DataTypes.DATE,
      allowNull: true
    },

    description: {
      type: DataTypes.TEXT
    },

    rarity: {
      type: DataTypes.ENUM('1', '2', '3'),
      defaultValue: '2'
    },

    popularity: {
      type: DataTypes.ENUM('1', '2', '3'),
      defaultValue: '2'
    },

    price: {
      type: DataTypes.ENUM('1', '2', '3'),
      defaultValue: '2'
    },

    period: {
      type: DataTypes.ENUM('1', '2', '3'),
      defaultValue: '2'
    }
  });

  Ticket.associate = function(models) {

    Ticket.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
      allowNull: false
    });
    
    Ticket.hasMany(models.ticket_trade, {
      sourceKey: 'ticket_id',
      foreignKey: 'ticket_for_bid_id',
      onDelete: "cascade"
    });

    Ticket.hasMany(models.ticket_trade, {
      sourceKey: 'ticket_id',
      foreignKey: 'ticket_to_bid_id',
      onDelete: "cascade"
    });

    // Ticket.hasMany(models.ticket_trade, {
    //   as: 'ticket_trade_tickets', 
    //   foreignKey: 'ticket_id',
    //   through: models.ticket_trade
    // });

    // Ticket.hasMany(models.ticket_trade, {
    //   as: 'ticket_trade_bid_tickets', 
    //   foreignKey: 'bid_ticket_id',
    //   through: models.ticket_trade
    // });
    
  };

  return Ticket;
}