'use strict';
// Nathan
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
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      namaProgramStudi: {
        unique: true,
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      fakultas_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Fakultas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      namaFakultas: {
        type: Sequelize.STRING(30),
        allowNull: false,
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
// Nathan