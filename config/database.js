const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Ensure the path is correct

// Nathan
const sequelize = new Sequelize(
   config.development.database,
   config.development.username,
   config.development.password,
   {
      host: config.development.host,
      dialect: config.development.dialect,
      dialectOptions: {
         maxAllowedPacket: 64 * 1024 * 1024, // 64M
      },
   }
);

sequelize
   .authenticate()
   .then(() => {
      console.log('Database connection has been established successfully.');
   })
   .catch(err => {
      console.error('Unable to connect to the database:', err);
   });

module.exports = sequelize;
// Nathan
