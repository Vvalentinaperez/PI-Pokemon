const { Pokemon, Type, Pokemons_type } = require("../db");

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