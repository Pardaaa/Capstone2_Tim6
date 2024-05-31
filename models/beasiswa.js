const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Beasiswa = db.define('Beasiswa', {
   mahasiswaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   ipkTerakhir: {
      type: DataTypes.FLOAT,
      allowNull: false,
   },
   jenisBeasiswa: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   dokumen: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
   },
   createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
   },
   updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
   },
});

module.exports = Beasiswa;
