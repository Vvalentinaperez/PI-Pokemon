const { Pokemon, Type } = require("../db");
const { v4:uuidv4 } = require("uuid");
const {Op} = require("sequelize");

//Lo primero que hace es traerse todas las propiedades por body. Verifican que existan, si no existen me lanza un mensaje de advertencia. Paso siguiente, lo que vamos a hacer es crear un pokemon en la base de datos, usando el modelo Pokemon, y los datos extraidos. Despues, va a buscar en la base de datos si el tipo requerido ya existe. Paso siguiente, vamos a asociar mi pokemon creado con los tipos. Despues va a buscar el pokemon creado por su id y lo va a devolver. 

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


        const typeName = await Type.findAll({  //Busca por nombre en la tabla de tipos
            where: {name: types}
        })
        
     
        await pokemons.addType(typeName);  //Y agrega ese array a mi pokemon ya creado
            
    
        const result = await Pokemon.findByPk(pokemons.id, {  //Va a buscar el poke que cree por el id, y le agrega sus tipos para dar una respuesta
            include: {
                model:Type, 
                through: "Pokemons_type"
            }
        })
        return res.status(201).json(result);
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { postPokemons }

