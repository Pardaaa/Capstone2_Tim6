'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('mahasiswas', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         namaMahasiswa: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         beasiswaId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Beasiswas',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
         },
         programStudiId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'Programstudis',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
         },
         statusAplikasi: {
            type: Sequelize.STRING,
            allowNull: false,
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
      await queryInterface.dropTable('mahasiswas');
   },
};
