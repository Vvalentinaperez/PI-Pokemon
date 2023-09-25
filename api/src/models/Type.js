const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('type', {
        id: {
            type: DataTypes.UUID, 
            defaultValue: sequelize.UUIDV4, 
            allowNull: false,
            primaryKey: true 
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}, {timestamps: true}