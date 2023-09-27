const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon"

//Aca lo que voy a hacer es una peticion a mi API de 50 pokemones. Por lo tanto, hago la peticion me quedo solo con el array de objetos. El cual voy a recorrer para que me tire el nombre del pokemon, con su url en la cual se encuentra el detalle del mismo. Si la peticion sale bien devuelvo el array de objetos, y si no lanzo un error. 

const getPokemons = async (_req, res) => {
    try {
        const { data } = await axios(`${URL}?limit=50`);
        const results = data.results; 

        let newInfo = results.map((result) => {return {
            name: result.name,
            url: result.url
        }})


        return res.status(200).json(newInfo); //Respuesta

    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = { getPokemons }