'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beasiswa extends Model {
    static associate(models) {
      // define association here
    }
  }
  Beasiswa.init({
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
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.VIRTUAL,
      get() {
        console.log(this.start_date, this.end_date);
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
      }
    },
  }, {
    sequelize,
    modelName: 'Beasiswa',
    tableName: 'beasiswa'
  });
  return Beasiswa
};