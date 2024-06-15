'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Fakultas, { foreignKey: 'fakultas_id' });
      User.belongsTo(models.Programstudi, { foreignKey: 'programStudi_id' });
    }
  }

  User.init({
    userId: {
      type: DataTypes.STRING(7),
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'mahasiswa', 'fakultas', 'program_studi'),
      allowNull: false
    },
    jabatan: {
      type: DataTypes.ENUM('Dekan', 'Wakil Dekan', 'Ketua Program Studi'),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Aktif', 'Pasif'),
      allowNull: true
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
    },
    programStudi_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Programstudi',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
}
// Nathan