const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon"
const {Pokemon} = require("../db");

//Aca lo que hacemos es recuperar todos los Pokemones de la base de datos, y a cada uno de ellos le estoy añadiendo una propiedad "origin" con valor "BDD" (eso para los filtros), Hago lo mismo de la API externa y a cada uno de ellos le agrego la propiedad origin con valor "API". Finalmente, combino ambas listas y las devuelvo. 

const getPokemons = async (_req, res) => {
    try {

      const pokeBdd = await Pokemon.findAll();
     
        const { data } = await axios(`${URL}?limit=48`)
        const results = data.results; 

        const detailPoke = await Promise.all(
        results.map(async (result) => {
        const {data} = await axios(result.url);
        
          return {
            id: data.id,
            name: data.name,
            image: data.sprites && data.sprites.other.home.front_default ? data.sprites.other.home.front_default: "C:\Users\valen\Downloads\imagenes Pokemon\thumb-201718.png", 
            type: data.types.map(typeObj => typeObj.type.name), 
            attack: data.stats.find(ataque => ataque.stat.name === "attack").base_stat,
            weight: data.weight, 
            height: data.height,
          }
        }))
        
        const allPokemons = [...pokeBdd, ...detailPoke];
        return res.status(200).json(allPokemons);
    
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { getPokemons }

