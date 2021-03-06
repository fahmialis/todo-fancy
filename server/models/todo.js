'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    date (){
      return `${this.due_date.getFullYear()}-${this.due_date.getMonth()}-${this.due_date.getDay()}`
    }
    
    static associate(models) {
      ToDo.belongsTo(models.User, {foreignKey : 'UserId'})
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
    UserId : {
      type : DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
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