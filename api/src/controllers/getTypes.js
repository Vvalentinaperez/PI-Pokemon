const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/type";
const { Type } = require("../db")

//La funcionalidad de este controlador es traer los tipos de pokemones. Lo primero que va a hacer es ir a buscar en la base de datos, y verificar que la misma exista y tenga algo. Si cumple esas condiciones, me va a devolver el array de objetos que este en ella. Si no cumple las condiciones, lo va a traer de la api, lo guarda en la base de datos, y lo devuelve. Si no encontro coincidencias en ambos lados, me va a arrojar un error. 


const getType = async (req, res) => {
    try {
        const type = await Type.findAll();
        

        if(type && type.length > 0){
            const types = type.map(tp =>  {
                return {
                id: tp.id,
                name: tp.name
            }
            } )
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