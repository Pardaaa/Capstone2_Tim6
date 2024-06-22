'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class PengajuanBeasiswa extends Model {
      static associate(models) {
         this.belongsTo(models.Beasiswa, { foreignKey: 'beasiswaId' });
         this.belongsTo(models.User, { foreignKey: 'userId' });
      }
   }

   PengajuanBeasiswa.init(
      {
         ipk: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         transkripAkademik: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
         },
         suratRekomendasiDosen: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
         },
         suratPernyataanBeasiswa: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
         },
         suratPelengkap: {
            type: DataTypes.BLOB('long'),
            allowNull: false,
         },
         statusAplikasi: {
            type: DataTypes.STRING,
            allowNull: true,
         },
         beasiswaId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'beasiswa',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
         },
         userId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'users',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
         },
      },
      {
         sequelize,
         modelName: 'PengajuanBeasiswa',
         tableName: 'pengajuanBeasiswa',
      }
   );

   return PengajuanBeasiswa;
};
