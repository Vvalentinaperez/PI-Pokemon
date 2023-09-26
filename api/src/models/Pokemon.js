const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('pokemon', {
        id:{
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: { //Imagenes. Estoy guardando una referencia a la imagen que esta guardada en front_default (prop de un objeto mas grande "sprites")
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true
        },
        life: { //Recordar que esta prop esta dentro de un objeto llamado stat, el cual esta dentro de un array llamado stats
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        attack: { //Recordar que esta prop esta dentro de un objeto llamado stat, el cual esta dentro de un array llamado stats
            type: DataTypes.STRING, 
            allowNull: false
        },
        defense: { //Recordar que esta prop esta dentro de un objeto llamado stat, el cual esta dentro de un array llamado stats
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        height: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        weight: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }
    })
}, {timestamps: true}

