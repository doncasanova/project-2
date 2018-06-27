module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true   
    },

    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: true
    },

    about: {
      type: DataTypes.TEXT
    },

    email: {
      type: DataTypes.STRING,
      validate: {
          isEmail: true
      },
      allowNull: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    last_login: {
      type: DataTypes.DATE
    },

    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
   
    // sequelize does have datatype value TIMESTAMP. add this column aftr the User table is created.
    // created_dt: {
    //   type: TIMESTAMP,
    //   allowNull: false, 
    //   defaultValue: CURRENT_TIMESTAMP
    // }
  });

  return User;
}