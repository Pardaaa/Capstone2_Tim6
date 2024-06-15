'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beasiswa extends Model {
    static associate(models) {
      // define association here
    }
  }
  Beasiswa.init({
    namaBeasiswa: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    syarat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    jenisBeasiswa: {
      type: DataTypes.ENUM('Internal'),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Beasiswa',
    tableName: 'beasiswa'
  });
  return Beasiswa
};