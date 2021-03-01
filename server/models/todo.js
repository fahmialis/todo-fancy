'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ToDo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          mgs : 'title cannot be empty'
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          mgs : 'description cannot be empty'
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type : DataTypes.DATE,
      validate : {
        notEmpty : {
          args : true,
          mgs : 'due_date cannot be empty'
        },
        isAfter : {
          args : new Date().toString(),
          msg : `please in put date after ${new Date()}`
        },
        isDate : {
          args : true,
          msg : `please input date format`
        }
      }
    },
    UserId : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ToDo',
    hooks : {
      beforeCreate(instance, options){
        if(!instance.status){
          instance.status = 'on progress'
        }
      },
    }
  })  ;
  return ToDo;
};