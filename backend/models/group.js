const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const Group=sequelize.define('groups',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    groupname:{
        type:Sequelize.STRING,
        allowNull:false
    // },
    // users:{
    //     type:Sequelize.STRING,
    //     defaultValue:null
    }
})
module.exports=Group