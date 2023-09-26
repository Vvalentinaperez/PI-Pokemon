const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/type";
const { Type } = require("../db")

const getType = async (req, res) => {
    try {
        const type = Type.findAll();
        
        

        if(type && type.length > 0){
            return res.status(200).json(type);
        }
        
        const response = await axios(URL);
        const respType = response.data.results;

        const saveType = await Type.bulkCreate(respType);

        res.status(200).json(saveType);


    } catch (error) {
        res.status(500).json("No existen pokemones de ese tipo");
    }
}

module.exports = { getType }