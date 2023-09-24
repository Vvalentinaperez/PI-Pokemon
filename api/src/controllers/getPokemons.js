const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon"

const getPokemons = async (_req, res) => {
    try {
        const { data } = await axios(`${URL}?limit=50`);
        const results = data.results;

        if(!results){
            throw Error("No existen los pokemones")
        }else{
            return res.status(200).json(results);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { getPokemons }