const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon"
const {Pokemon, Type} = require("../db");


//Aca lo que voy a hacer primeramente es traerme todos los pokemones que esten guardados en la base de datos. Una vez que hice esto, voy a hacerle una peticion a mi api para para poder obtenerlos por la api externa. Voy a hacer una segunda peticion a result.url debido a que alli se encuentran todos los datos que necesito. El Promise.All espera hasta que todas las promesas se hayan resuelto y ahi me da el resultado. Cuando tengo el resultado voy a retornar un array de objetos con las propiedades necesarias. Despues hago una copia de los pokemones de la base de datos con los de la api y la retorno. 


const getPokemons = async (_req, res) => {
    try {

      const pokeBdd = await Pokemon.findAll();
      let pokeType = [];

      if(pokeBdd.length !== 0){
       pokeType = await Promise.all(pokeBdd.map( async (poke) => {

          let pokemon = await Pokemon.findOne(
          {where: {id: poke.id},
          include: {model: Type, attributes: ["name"] }
        }
        )
        const types = pokemon.types.map(type => type.name)
        pokemon = {...pokemon.toJSON(), types}
        return pokemon;
      }))
     }
    
    
      const { data } = await axios(`${URL}?limit=48`)
      const results = data.results; 

        const detailPoke = await Promise.all(
        results.map(async (result) => {
        const {data} = await axios(result.url);
        
          return {
            id: data.id,
            name: data.name,
            image: data.sprites && data.sprites.other.home.front_default ? data.sprites.other.home.front_default: "C:\Users\valen\Downloads\imagenes Pokemon\thumb-201718.png", 
            types: data.types.map(typeObj => typeObj.type.name), 
            attack: data.stats.find(ataque => ataque.stat.name === "attack").base_stat,
            weight: data.weight, 
            height: data.height,
          }
        }))
        
      const allPokemons = [...pokeType, ...detailPoke];
      return res.status(200).json(allPokemons);
    
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { getPokemons }

