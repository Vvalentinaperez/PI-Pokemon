const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Pokemon } = require("../db");
const {UUID, where} = require("sequelize");

//La funcionalidad de este controlador es traer pokemones por medio de su id. Entonces, me voy a traer el id con params y voy a verificar si es de tipo UUID. Si es UUID, primero voy a ir a ver si ese pokemon ya existe en mi base de datos, si existe lo voy a devolver. Si no existe, lo voy a traer de la api y lo voy a devolver. Si en el proceso courrio algo, me lanza un error. 


const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        if(id){
          const pokemon = await Pokemon.findOne(
            {where: { id: id}}
          ) 

          if(pokemon){
            res.status(202).json(pokemon);
          }
        console.log(typeof id === UUID);

        // console.log(pokemon)
        
        // const pokeDetail = {
        //   id: pokemon.id,
        //   name: pokemon.name,
        //   image: pokemon.sprites.other.home.front_default, 
        //   type: pokemon.types[0]?.type?.name, 
        //   life: pokemon.stats.find(vida => vida.stat.name === "hp").base_stat,
        //   attack: pokemon.stats.find(ataque => ataque.stat.name === "attack").base_stat,
        //   defense: pokemon.stats.find(defensa => defensa.stat.name === "defense").base_stat,
        //   speed: pokemon.stats.find(velocidad => velocidad.stat.name === "speed").base_stat,
        //   weight: pokemon.weight, 
        //   height: pokemon.height
      // }
      }

      const { data } = await axios(`${URL}/${id}`); 
      
      if(data){
        const pokeDetail = {
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
        }
        return res.status(201).json(pokeDetail)
      }else{
        return res.status(204).json("No se encontro el Pokemon solicitado")
      }

    } catch (error) {
      console.log(error.message);
        res.status(404).json("No se encontraron pokemones con ese id");
    }
}

module.exports = { getPokemonById }