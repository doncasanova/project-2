module.exports = function(sequelize, DataTypes) {
  var LookupEvent = sequelize.define("lookup_event", {

    lookup_event_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true   
    },

    event_type: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    event_name: {
      type: DataTypes.STRING,
      notEmpty: true
    }, 

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return LookupEvent;
}