'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(50)
      },
      fullName: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(30)
      },
      password: {
        type: Sequelize.STRING(100)
      },
      role: {
        type: Sequelize.ENUM('Admin', 'Mahasiswa', 'Fakultas', 'Program Studi')
      },
      jabatan: {
        type: Sequelize.ENUM('Dekan', 'Wakil Dekan', 'Ketua Program Studi')
      },
      status: {
        type: Sequelize.ENUM('Aktif', 'Pasif')
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
      programStudi_id: {
        type: Sequelize.STRING(20),
        references: {
          model: 'programStudis',
          key: 'programStudi_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('users');
  }
};