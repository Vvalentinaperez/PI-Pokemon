const { Pokemon, Type } = require("../db");
const { v4:uuidv4 } = require("uuid");
const {Op} = require("sequelize");

//Lo que primero va a hacer es obtener la informacion que voy a usar para agregar el Pokemon. Y voy a verificar que todos existan, si falta alguno me lanza un error. Paso siguiente, vamos a crear el pokemon y agregarlo a la base de datos. Si el pokemon no se pudo crear, porque por ejemplo ya existia en la base de datos me lanza un error. 

//Paso siguiente, lo que va a ahcer es verificar en la base de datos si ese pokemon tambien tiene un type, si no lo tiene lo va a crear y lo va a agregar al pokemon que acabamos de crear. 

//Si algo sale mal, me arroja un errror. 

const postPokemons = async (req, res) => {
    try {
        const { name, image, life, attack, defense, height, weight, types, speed} = req.body; 

        if(!name || !image || !life || !attack || !defense || !height || !weight || !speed || !types){
            res.status(400).send("Faltan datos");
        }

        if(types.length === 0) return res.status(400).send("Agrega al menos un tipo");
        
        const pokemons = await Pokemon.create({
            name, 
            image, 
            life, 
            attack, 
            defense, 
            height, 
            weight, 
            speed
        });


        const typeName = await Type.findAll({
            where: {name: types}
        })

       
        await pokemons.addType(typeName);
            
    
        
        const result = await Pokemon.findByPk(pokemons.id, {
            include: {
                model:Type, 
                through: "Pokemons_type"
            }
        })
        return res.status(201).json(result);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}

module.exports = { postPokemons }

