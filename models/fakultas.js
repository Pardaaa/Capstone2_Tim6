'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

class Fakultas extends Model {
  static associate(models) {
    this.hasMany(models.ProgramStudi, { foreignKey: 'fakultas_id' });
    this.hasMany(models.User, { foreignKey: 'fakultas_id' });
  }
}

Fakultas.init({
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
  modelName: 'Fakultas',
  tableName: 'fakultas'
});

module.exports = Fakultas;