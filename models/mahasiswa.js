'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Mahasiswa extends Model {
      static associate(models) {
         this.belongsTo(models.Fakultas, { foreignKey: 'fakultasId' });
         this.belongsTo(models.Beasiswa, { foreignKey: 'beasiswaId' });
         this.belongsTo(models.Programstudi, { foreignKey: 'programStudiId' });
      }
   }

   Mahasiswa.init(
      {
         namaMahasiswa: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         beasiswaId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'Beasiswas',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
         },
         programStudiId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'Programstudis',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
         },
         statusAplikasi: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      },
      {
         sequelize,
         modelName: 'Mahasiswa',
         tableName: 'mahasiswas',
      }
   );

   return Mahasiswa;
};
