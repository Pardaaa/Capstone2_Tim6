'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('pengajuanBeasiswa', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         ipk: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         transkripAkademik: {
            type: Sequelize.BLOB('long'),
            allowNull: false,
         },
         suratRekomendasiDosen: {
            type: Sequelize.BLOB('long'),
            allowNull: false,
         },
         suratPernyataanBeasiswa: {
            type: Sequelize.BLOB('long'),
            allowNull: false,
         },
         suratPelengkap: {
            type: Sequelize.BLOB('long'),
            allowNull: false,
         },
         statusAplikasi: {
            type: Sequelize.STRING,
            allowNull: true,
         },
         statusFakultas: {
            type: Sequelize.STRING,
            allowNull: true,
         },
         ipkDesc : {
            type: Sequelize.STRING,
            allowNull: true,
         },
         transkripAkademikDesc : {
            type: Sequelize.STRING,
            allowNull: true,
         },
         suratRekomendasiDosenDesc : {
            type: Sequelize.STRING,
            allowNull: true,
         },
         suratPernyataanBeasiswaDesc : {
            type: Sequelize.STRING,
            allowNull: true,
         },
         suratPelengkapDesc : {
            type: Sequelize.STRING,
            allowNull: true,
         },
         beasiswaId: {
            type: Sequelize.INTEGER,
            references: {
               model: 'beasiswa',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
         },
         userId: {
            type: Sequelize.INTEGER,
            references: {
               model: 'users',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
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
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('pengajuanBeasiswa');
   },
};
