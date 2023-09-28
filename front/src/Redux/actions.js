import {GET_POKEMONS} from "../Redux/actions-type"
import axios from "axios";



export const getPokemons = () => {
    return async (dispatch) => {

        const endpoint = "https://pokeapi.co/api/v2/pokemon"

        try {
            const {data} = await axios(endpoint) 
            const response = data.results;

            if(!response){
                throw Error("No se pudo obtener la informacion requerida");
            }

            const responseInfo = await Promise.all(
                response.map(async (pokemon) => {
                    const detail = await axios(pokemon.url);
                    return detail.data;
                })
            );

            return dispatch({
                type: GET_POKEMONS, 
                payload: responseInfo
            })
            
        } catch (error) {
            console.log(error.message);
        }
    }
}

