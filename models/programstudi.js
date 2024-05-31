'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

class programStudi extends Model {
  static associate(models) {
  }
}

programStudi.init({
  programStudi_id: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  namaProgramStudi: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  fakultas_id: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  namaFakultas: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'programStudi',
  tableName: 'programStudis'
});

programStudi.associate = function (models) {
  User.belongsTo(models.fakultas, {
    foreignKey: 'fakultas_id',
    targetKey: 'fakultas_id'
  });
};

module.exports = programStudi;
