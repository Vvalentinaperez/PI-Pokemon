const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const { Pokemon } = require("../db");

//La funcionalidad de este controlador es traer pokemones por medio de su id. Entonces, me voy a traer el id con params y voy a verificar si es de tipo UUID. Si es UUID, primero voy a ir a ver si ese pokemon ya existe en mi base de datos, si existe lo voy a devolver. Si no existe, lo voy a traer de la api y lo voy a devolver. Si en el proceso courrio algo, me lanza un error. 


const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;

        //Verifica si el id que me llega por parametro es un codigo UUID
        const isUUID = 
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      );

      if(isUUID){
        const pokemon = await Pokemon.findOne({where: {id}});
        res.status(200).json(pokemon);
      }

      const { data } = await axios(`${URL}/${id}`); 
      res.status(200).json(data);  
      
       
    } catch (error) {
        res.status(500).send("No se encontraron pokemones con ese id");
    }
}

module.exports = { getPokemonById }