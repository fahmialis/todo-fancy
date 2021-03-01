'use strict';
const {hashPassword} = require('../helpers/bycriptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.ToDo,{foreignKey : 'UserId'})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'please write in email format'
        },
        notEmpty : {
          args : true,
          mgs : 'email cannot be empty'
        }
      },
      unique : true
    }, 
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          mgs : 'password cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (instance) =>{
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};