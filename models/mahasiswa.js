const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Mahasiswa = db.define('Mahasiswa', {
   nama: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   nrp: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   ipk_terakhir: {
      type: DataTypes.FLOAT,
      allowNull: false,
   },
   agama: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   jenis_beasiswa: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});

module.exports = Mahasiswa;
