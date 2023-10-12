const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Pokemon, Type} = require("../db");


//La funcionalidad de este controlador es traer pokemones por el id. Si el id es de tipo UUID, entonces busca en la base de datos un pokemon que coincida con ese id. Ademas de la info del pokemon, quiero incluir el nombre de los tipos que tenga ese Pokemon. Ojo: mis types, contienen mas info, yo solamente me quiero quedar con su propiedad name, que es donde se encuentran los tipos del pokemon. Por eso, lo recorro y me quedo con esa prop. Ahora, lo que vamos a hacer es pasar mi objeto de tipo json a Javascrip puro y le agrego una nueva prop que es el type. 
//Si no encuentra el pokemon en la base de datos, lo busca en la api. Si la api me devolvio una respuesta afirmativa, se crea un nuevo objeto a partir de esa respuesta y me la devuelve. 

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);

        let pokemon;

        if(isUUID){
           pokemon = await Pokemon.findOne(
            {where: {id}, 
            include: {model: Type, attributes: ["name"] }
          }
          )
          const types = pokemon.types.map(type => type.name)
          pokemon = {...pokemon.toJSON(), types}
        }

      if(!pokemon){
      const { data } = await axios(`${URL}/${id}`); 
      
      if(!data){return res.status(204).json("No se encontro el Pokemon solicitado")}

        pokemon = {
            id: data.id,
            name: data.name,
            image: data.sprites.other.home.front_default, 
            types: data.types.map(tp => tp.type.name),
            life: data.stats.find(vida => vida.stat.name === "hp").base_stat,
            attack: data.stats.find(ataque => ataque.stat.name === "attack").base_stat,
            defense: data.stats.find(defensa => defensa.stat.name === "defense").base_stat,
            speed: data.stats.find(velocidad => velocidad.stat.name === "speed").base_stat,
            weight: data.weight, 
            height: data.height
        }
      }
      return res.status(201).json(pokemon)
        
    } catch (error) {
        res.status(404).json("No se encontraron pokemones con ese id");
    }
}

module.exports = { getPokemonById }