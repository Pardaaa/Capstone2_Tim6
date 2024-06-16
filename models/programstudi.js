'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Programstudi extends Model {
    static associate(models) {
      this.belongsTo(models.Fakultas, { foreignKey: 'fakultas_id' });
      this.hasMany(models.User, { foreignKey: 'programStudi_id' });
    }
  }
  Programstudi.init({
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
      allowNull: true,
      references: {
        model: 'Fakultas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    sequelize,
    modelName: 'Programstudi',
    tableName: 'programstudis'
  });
  return Programstudi;
};
