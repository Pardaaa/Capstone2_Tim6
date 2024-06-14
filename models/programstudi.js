const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Fakultas = require('./fakultas')

// Nathan
class ProgramStudi extends Model {
  static associate(models) {
    this.belongsTo(models.Fakultas, { foreignKey: 'fakultas_id' });
  }
};

ProgramStudi.init({
  programStudi_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  namaProgramStudi: {
    unique: true,
    type: DataTypes.STRING(30),
    allowNull: false
  },
  fakultas_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  namaFakultas: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ProgramStudi',
  tableName: 'programstudis'
});

module.exports = ProgramStudi;
// Nathan