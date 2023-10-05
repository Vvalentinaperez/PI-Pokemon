const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon"
const {Pokemon} = require("../db");

//Aca lo que hacemos es recuperar todos los Pokemones de la base de datos, y a cada uno de ellos le estoy añadiendo una propiedad "origin" con valor "BDD" (eso para los filtros), Hago lo mismo de la API externa y a cada uno de ellos le agrego la propiedad origin con valor "API". Finalmente, combino ambas listas y las devuelvo. 

const getPokemons = async (_req, res) => {
    try {

      const pokeBdd = await Pokemon.findAll();
     

        const { data } = await axios(`${URL}?limit=48`)
        const results = data.results; 

        const detailPokePromises = results.map(async (result) => {
        const detailResponse = await axios(result.url);
        const detail = detailResponse.data;

        const typeNames = detail.types.map(typeObj => typeObj.type.name);

        
        
          return {
            id: detail.id,
            name: detail.name,
            image: detail.sprites && detail.sprites.other.home.front_default ? detail.sprites.other.home.front_default: "C:\Users\valen\Downloads\imagenes Pokemon\thumb-201718.png", 
            type: typeNames, 
            attack: detail.stats.find(ataque => ataque.stat.name === "attack").base_stat,
            weight: data.weight, 
            height: data.height,
          }
        
        })
        
        const detailPoke = await Promise.all(detailPokePromises);
        
        const allPokemons = [...pokeBdd, ...detailPoke];

        return res.status(200).json(allPokemons);
    
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { getPokemons }

