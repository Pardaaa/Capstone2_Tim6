'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('beasiswas', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         namaBeasiswa: {
            type: Sequelize.STRING(30),
            allowNull: false,
         },
         deskripsi: {
            type: Sequelize.TEXT,
            allowNull: false,
         },
         jenisBeasiswa: {
            type: Sequelize.ENUM('Internal'),
            allowNull: false,
         },
         start_date: {
            type: Sequelize.DATE,
            allowNull: true,
         },
         end_date: {
            type: Sequelize.DATE,
            allowNull: true,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('beasiswas');
   },
};
