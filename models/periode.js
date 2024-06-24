'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Periode extends Model {
    static associate(models) {
      this.hasMany(models.Beasiswa, { foreignKey: 'periodeId' });
    }
  }
  Periode.init({
    periode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Periode',
    tableName: 'periode',
  });
  return Periode;
};