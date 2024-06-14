'use strict';
// Nathan
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
      userId: {
        type: Sequelize.STRING(7),
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      fullName: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('Admin', 'Mahasiswa', 'Fakultas', 'Program Studi'),
        allowNull: false,
      },
      jabatan: {
        type: Sequelize.ENUM('Dekan', 'Wakil Dekan', 'Ketua Program Studi')
      },
      status: {
        type: Sequelize.ENUM('Aktif', 'Pasif')
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
      programStudi_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'programStudis',
          key: 'id'
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
// Nathan