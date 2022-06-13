const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const Message=sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    msg:{
        type:Sequelize.STRING
    },
    username:{
        type:Sequelize.STRING
    }

})
module.exports=Message