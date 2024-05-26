'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fakultas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fakultas.init({
    fakultas_id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    namaFakultas: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'fakultas',
  });
  return fakultas;
};