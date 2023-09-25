const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon"

const getPokemons = async (_req, res) => {
    try {
        const { data } = await axios(`${URL}?limit=50`);
        const results = data.results; 

        let newInfo = results.map((result) => {return {
            name: result.name
        }})


        return res.status(200).json(newInfo); //Respuesta

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { getPokemons }