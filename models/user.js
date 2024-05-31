'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Fakultas = require('./fakultas');

class User extends Model {
  static associate(models) {
    User.hasMany(models.Fakultas, {
      foreignKey: 'fakultas_id'
    });
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
  fakultas_id: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  prodi_id: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});

User.associate = function (models) {
  User.hasMany(models.Fakultas, {
    foreignKey: 'fakultas_id'
  });
};

module.exports = User;
