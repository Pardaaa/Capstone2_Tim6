'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

class fakultas extends Model {
  static associate(models) {
  }
}


fakultas.init({
  fakultas_id: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  namaFakultas: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'fakultas',
  tableName: 'fakultas'
});

module.exports = fakultas;