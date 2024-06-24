'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
   class Beasiswa extends Model {
      static associate(models) {
         this.hasMany(models.PengajuanBeasiswa, { foreignKey: 'beasiswaId' });
         this.belongsTo(models.Periode, { foreignKey: 'periodeId' });
      }
   }
   Beasiswa.init(
      {
         namaBeasiswa: {
            type: DataTypes.STRING(30),
            allowNull: false,
         },
         deskripsi: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         jenisBeasiswa: {
            type: DataTypes.ENUM('Internal'),
            allowNull: false,
         },
         start_date: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         end_date: {
            type: DataTypes.DATE,
            allowNull: true,
         },
         periodeId: {
            type: DataTypes.INTEGER,
            references: {
               model: 'Periode',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
         },
         status: {
            type: DataTypes.VIRTUAL,
            get() {
               const now = new Date();
               if (!this.start_date || !this.end_date) {
                  return 'Belum Berlangsung';
               } else if (this.start_date > now) {
                  return 'Belum Berlangsung';
               } else if (this.end_date < now) {
                  return 'Selesai';
               } else {
                  return 'Berlangsung';
               }
            },
         },
      },
      {
         sequelize,
         modelName: 'Beasiswa',
         tableName: 'beasiswa',
      }
   );
   return Beasiswa;
};
