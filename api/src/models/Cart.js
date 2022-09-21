const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('cart', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        total:{
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        events:{
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        }
    });
}