const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ProgramStudi extends Model { }

ProgramStudi.init({
  programStudi_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true
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
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ProgramStudi',
  tableName: 'programstudis'
});

ProgramStudi.associate = function (models) {
  ProgramStudi.belongsTo(models.Fakultas, {
    foreignKey: 'fakultas_id',
    targetKey: 'fakultas_id'
  });
};

module.exports = ProgramStudi;
