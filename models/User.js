const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {}

//User model to create the table. uses bcrypt so whenever something is sent to the password. it hash it so it can be secured

User.init({
    
    email: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true,
         validate:{
            isEmail:true
         }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }
},{
    sequelize,
    hooks:{
        beforeCreate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,4);
            return userObj;
        }
    }
});

module.exports=User