'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Fakultas = require('./fakultas');
const Programstudi = require('./programstudi');

class User extends Model {
  static associate(models) {

  }
}

User.init({
  username: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'mahasiswa', 'fakultas', 'program_studi'),
    allowNull: false
  },
  jabatan: {
    type: DataTypes.ENUM('Dekan', 'Wakil Dekan', 'Ketua Program Studi'),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Aktif', 'Pasif'),
    allowNull: true
  },
  fakultas_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  programStudi_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});

module.exports = User;
