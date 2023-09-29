import {CLEAN_DETAIL, GET_POKEMONS, GET_POKE_DETAIL, GET_POKE_BY_NAME} from "../Redux/actions-type"
import axios from "axios";
const endpoint = "http://localhost:3001"



export const getPokemons = () => {
    return async (dispatch) => {
        
        try {
            const {data} = await axios(`${endpoint}/pokemon`) 

            if(!data){
                throw Error("No se pudo obtener la informacion requerida");
            }

            return dispatch({
                type: GET_POKEMONS, 
                payload: data
            })
            
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getPokeDetail = (id) => {
    return async (dispatch) => {
        try {
            // console.log(id);
            const {data} = await axios(`${endpoint}/pokemon/${id}`)

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

export const cleanDetail = () => {
    return{
        type: CLEAN_DETAIL
    }
}

export const getPokeByName = (name) => {
   return async (dispatch) => {
    try {
       const { data } = await axios(`${endpoint}/pokemon/name?name=${name}`)
       console.log(data)
       return dispatch({
        type: GET_POKE_BY_NAME, 
        payload: data
       })


    } catch (error) {
        console.log(error.message);
    }
   }
}