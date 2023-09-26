const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Pokemon } = require("../db");

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query.toLowerCase();

        const pokeByName = await Pokemon.findOne({
            where: {name}
        })

        if(pokeByName){
            res.status(200).json(pokeByName);
        }

        const { data } = await axios(`${URL}/${name}`)
        res.status(200).json(data);


    } catch (error) {
        res.status(500).json(error.message);
    }
}


module.exports = { getPokemonByName }