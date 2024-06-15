'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beasiswa extends Model {
    static associate(models) {
      // define association here
    }
  }
  beasiswa.init({
    beasiswaId: DataTypes.STRING,
    namaBeasiswa: DataTypes.STRING,
    syarat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'beasiswa',
  });
  return beasiswa
};