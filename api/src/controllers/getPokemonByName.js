const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Pokemon } = require("../db");

//La funcionalidad de este controlador es traer pokemones por medio de su name. Entonces, me voy a traer el name con la query y voy traerlo independientemente si esta escrito con minusculas o mayusculas .Primero voy a ir a ver si ese pokemon ya existe en mi base de datos, si existe lo voy a devolver. Si no existe, lo voy a traer de la api y lo voy a devolver. Si en el proceso courrio algo, me lanza un error. 

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query
        
        const pokeByName = await Pokemon.findOne({
            where: {name}
        })

        if(pokeByName){
            res.status(200).json(pokeByName);
        }

        const nameMayus = name.toLowerCase();

        const { data } = await axios(`${URL}/${nameMayus}`)
        
        if(data){
            const pokeDetail =[ {
                id: data.id,
                name: data.name,
                image: data.sprites.other.home.front_default, 
                type: data.types[0]?.type?.name, 
                life: data.stats.find(vida => vida.stat.name === "hp").base_stat,
                attack: data.stats.find(ataque => ataque.stat.name === "attack").base_stat,
                defense: data.stats.find(defensa => defensa.stat.name === "defense").base_stat,
                speed: data.stats.find(velocidad => velocidad.stat.name === "speed").base_stat,
                weight: data.weight, 
                height: data.height
            }]
            return res.status(200).json(pokeDetail)

        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}


module.exports = { getPokemonByName }