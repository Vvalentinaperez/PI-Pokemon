const { Pokemon, Type, Pokemons_type } = require("../db");

//Lo que primero va a hacer es obtener la informacion que voy a usar para agregar el Pokemon. Y voy a verificar que todos existan, si falta alguno me lanza un error. Paso siguiente, vamos a crear el pokemon y agregarlo a la base de datos. Si el pokemon no se pudo crear, porque por ejemplo ya existia en la base de datos me lanza un error. 

//Paso siguiente, lo que va a ahcer es verificar en la base de datos si ese pokemon tambien tiene un type, si no lo tiene lo va a crear y lo va a agregar al pokemon que acabamos de crear. 

//Si algo sale mal, me arroja un errror. 

const postPokemons = async (req, res) => {
    try {
        const { name, image, life, attack, defense, height, weight, types} = req.body; 

        if(!name || !image || !life || !attack || !defense || !height || !weight || !types){
            res.status(400).send("Faltan datos");
        }

        const [newPoke, created] = await Pokemon.findOrCreate({
            where: {name}, 
            defaults:{ 
                image, 
                life, 
                attack, 
                defense, 
                height, 
                weight
            }
        })

        if(!created){
            res.status(400).send("No se pudo crear el Pokemon")
        }
        
        for(let typeName of types){
            const [typeInstance] = await Type.findOrCreate({
                where: { name: typeName}
            });

             await Pokemons_type.create({
                pokemonId: newPoke.id,
                typeId: typeInstance.id
            });
        }

        res.status(200).json(newPoke)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
}

module.exports = { postPokemons }