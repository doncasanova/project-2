module.exports = function(sequelize, DataTypes) {
  var Ticket = sequelize.define("Ticket", {underscored: true}, {
    'ticket_id': {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true   
    },

    'ticket_name': {
      type: DataTypes.STRING,
      notEmpty: true
    },

    location: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    // season_start: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // },

    // season_end: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // },

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

    'valid_period': {
      type: DataTypes.ENUM('1', '2', '3'),
      defaultValue: '2'
    }
  });

  //Ticket.associate = function(models) {
    // Ticket.belongsTo(models.User, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });

    // Ticket.belongsTo(models.User, {
    //   foreignKey: 'user_id',
    //     allowNull: false
    // });

    // Ticket.belongsToMany(models.Ticket, {
    //   as: 'bid_ticket', 
    //   through: models.Ticket_trade
    // });
  //};

  return Ticket;
}