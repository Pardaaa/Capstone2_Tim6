'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Fakultas extends Model {
      static associate(models) {
         this.hasMany(models.Programstudi, { foreignKey: 'fakultas_id' });
         this.hasMany(models.User, { foreignKey: 'fakultas_id' });
      }
   }
   Fakultas.init(
      {
         fakultas_id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
         },
         namaFakultas: {
            unique: true,
            type: DataTypes.STRING(30),
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'Fakultas',
         tableName: 'fakultas',
      }
   );
   return Fakultas;
};
