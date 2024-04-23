//importing modules
const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require('../config/db.config.js')

// connecting database
const sequelize = new Sequelize(
    dbConfig.DB ,dbConfig.USER , dbConfig.PASSWORD,
    { host: 'localhost' , dialect: "mysql", logging: false, 
      timezone: "+05:30",  pool:{
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    } }
  );
  sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
    throw(err)
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//connecting to model

db.todos = require("./todoModel.js")(sequelize, DataTypes);




module.exports = db;