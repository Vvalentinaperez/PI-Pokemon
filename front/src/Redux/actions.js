import {GET_POKEMONS, GET_POKE_DETAIL} from "../Redux/actions-type"
import axios from "axios";
const endpoint = "https://pokeapi.co/api/v2/pokemon"



export const getPokemons = () => {
    return async (dispatch) => {
        

        try {
            const {data} = await axios(`${endpoint}?limit=50`) 
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

export const getPokeDetail = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axios(`${endpoint}/${id}`)

            if(!data){
                throw Error("No se pudo acceder al detalle del pokemon");
            }

            return dispatch({
                type: GET_POKE_DETAIL, 
                payload: data
            })
            
        } catch (error) {
            console.log(error.message);
        }
    }
}