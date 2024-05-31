'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('programStudis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      programStudi_id: {
        unique: true,
        type: Sequelize.STRING(20)
      },
      namaProgramStudi: {
        type: Sequelize.STRING(30)
      },
      fakultas_id: {
        type: Sequelize.STRING(20),
        references: {
          model: 'fakultas',
          key: 'fakultas_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      namaFakultas: {
        type: Sequelize.STRING(30)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('programStudis');
  }
};