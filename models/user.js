module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true   
    },

    first_name: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    last_name: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    email: {
      type: DataTypes.STRING,
      validate: {
          isEmail: true
      },
      allowNull: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    about_me: {
      type: DataTypes.TEXT,
      allowNull: true
    },
       
    last_login: {
      type: DataTypes.DATE
    },

    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  });

  User.associate = function(models) {
    User.hasMany(models.ticket, {
      sourceKey: 'user_id',
      foreignKey: 'user_id',
      onDelete: "cascade"
    });
  };

  return User;
}