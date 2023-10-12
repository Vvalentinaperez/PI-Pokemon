const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/type";
const { Type } = require("../db")

//La funcionalidad de este controlador es traerme todos los tipos de los pokemones, entonces primero va a buscar en la base de datos, si la tabla en la base de datos existe o es mayor a 0, va a mapear los tipos y va a devolverme las props que necesito (id, name), y me las va a devolver. Caso contrario, va a ir a buscar a la api, me voy a quedar solo con la info que necesito. Voy a recorrer la respuesta que me da la api para quedarme solo con la prop name, y voy a guardar un registro en mi base de datos y voy a devolver al cliente solo el id y el name de los typos. 


const getType = async (req, res) => {
    try {
        const type = await Type.findAll();
        
        if(type && type.length > 0){
            const types = type.map(tp =>  {
                return {
                id: tp.id,
                name: tp.name
            }
            })
            return res.status(200).json(types);
        }
        
        const response = await axios(URL);
        const respType = response.data.results;

        const typeName = respType.map(resp => ({ name: resp.name }))

        const saveType = await Type.bulkCreate(typeName);

        const typesName = saveType.map(tp =>  {
            return {
                id: tp.id,
                name: tp.name
            }
        })
        res.status(200).json(typesName);

    } catch (error) {
        console.log(error.message)
        res.status(500).json("No existen pokemones de ese tipo");
    }
}

module.exports = { getType }