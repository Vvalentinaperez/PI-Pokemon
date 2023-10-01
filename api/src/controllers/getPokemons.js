const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon"

//Aca lo que voy a hacer es una peticion a mi API de 50 pokemones. Por lo tanto, hago la peticion me quedo solo con el array de objetos. El cual voy a recorrer para que me tire el nombre del pokemon, con su url en la cual se encuentra el detalle del mismo. Si la peticion sale bien devuelvo el array de objetos, y si no lanzo un error. 

const getPokemons = async (_req, res) => {
    try {
        const { data } = await axios(`${URL}?limit=50`);
        const results = data.results; 

        const detailPokePromises = results.map(async (result) => {
        const detailResponse = await axios(result.url);
        const detail = detailResponse.data;

        const typeNames = detail.types.map(typeObj => typeObj.type.name);

        const nameStringType = typeNames.join(" , ");
        
          return {
            id: detail.id,
            name: detail.name,
            image: detail.sprites && detail.sprites.other.home.front_default ? detail.sprites.other.home.front_default: "C:\Users\valen\Downloads\imagenes Pokemon\thumb-201718.png", 
            type: nameStringType, 
            attack: detail.stats.find(ataque => ataque.stat.name === "attack").base_stat,
          }
        
        })
        
        const detailPoke = await Promise.all(detailPokePromises);

        if(detailPoke){
          return res.status(200).json(detailPoke)
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { getPokemons }