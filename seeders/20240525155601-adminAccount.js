'use strict';
const bcrypt = require('bcrypt');

// Nathan
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      username: 'Admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('21122112', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
// Nathan
