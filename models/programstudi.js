const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Fakultas = require('./fakultas')

class ProgramStudi extends Model {
  static associate(models) {
    this.belongsTo(models.Fakultas, { foreignKey: 'fakultas_id' });
  }
};

ProgramStudi.init({
  programStudi_id: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  namaProgramStudi: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  fakultas_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Fakultas,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'ProgramStudi',
  tableName: 'programstudis'
});

module.exports = ProgramStudi;
