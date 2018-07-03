const db = require('../models');
const {table} = require('table');

class Users {
  constructor() {
    this.usersAll = [];
    this.usersByUser = [];
    this.usersByuser = [];
    this.usersOnMarket = [];
    this.usersOnMarketByUser = [];
    this.usersOnMarketByTicket = [];

    this.userSelected;
    this.userInserted;
    this.userUpdated;
  }

  getAllUsers() {
    this.usersAll = [];
    return db.user
      .findAll({include: [db.user]})
      .then (dbusers => {
        //console.log(table(dbusers));
        dbusers.forEach(t => this.usersAll.push(t));
        //console.log(this.usersAll);
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  getUserByUserIdentity(id) {
    this.userSelected = null;
    return db.user
      .findOne({
        where: {
          user_identity: id 
        }})
      .then (dbUser => {
        if (dbUser) {
        console.log("getUserById in user-data.js \n", dbUser.user_id);
        return this.userSelected = dbUser;
        }
        else 
          return dbUser;
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  getUserByEmail(email) {
    this.userSelected = null;
    return db.user
      .findOne({
        where: {
          email: email 
        }})
      .then (dbUser => {
        if (dbUser) {
        console.log("getUserByEmail in user-data.js \n", dbUser.user_id);
        return this.userSelected = dbUser;
        }
        else 
          return dbUser;
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  createUser(userInfo) {
    this.userInserted = null;
    return db.user.create(userInfo)
      .then(dbUser => {
        console.log("createUser in user-data.js \n", dbUser.user_id);
        return this.userInserted = dbUser});
  };
  
  setUserToSessionStorage(userInfo) {
    sessionStorage.clear();
    sessionStorage.setItem('first_name', userInfo.first_name);
    sessionStorage.setItem('last_name', userInfo.last_name);
    sessionStorage.setItem('email', userInfo.email);
    sessionStorage.setItem('user_identity', userInfo.user_identity);
    //sessionStorage.setItem('definitions', JSON.stringify(definitions));
  }

  getUserFromSessionStorage() {
    return {
      'first_name': sessionStorage.getItem('first_name'),
      'last_name': sessionStorage.getItem('last_name'),
      'email': sessionStorage.getItem('email'),
      'user_identity': sessionStorage.getItem('user_identity')
      //definitions: JSON.parse(sessionStorage.getItem('definitions')),
      //searchedTime: sessionStorage.getItem('searchedTime')
    };
  }
}

module.exports = Users;


