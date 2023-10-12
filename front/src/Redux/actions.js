import {CLEAN_DETAIL, GET_POKEMONS, GET_POKE_DETAIL, GET_POKE_BY_NAME, ORDER_POKE, ORDER_BY_ORIGIN, CREATE_POKE, GET_TYPE, ORDER_BY_TYPE} from "../Redux/actions-type"
import axios from "axios";

const endpoint = process.env.REACT_APP_URL
console.log(endpoint)


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
            const { data } = await axios.get(`${endpoint}/pokemon/${id}`)
           
            if(!data){
                throw Error("No se pudo acceder al detalle del pokemon");
            }

            return dispatch({
                type: GET_POKE_DETAIL, 
                payload: data
            })
            
        } catch (error) {
            alert(error);
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

export const orderPokes = (orderType, pokemons) =>{
    try {
        const orderPoke = [...pokemons]
        //Ordena los pokemones de forma asc y desc
       if(orderType === "A"){ orderPoke.sort((a, b) => a.id - b.id)}
       if(orderType === "D"){orderPoke.sort((a, b) => b.id - a.id)} 
       //Ordena los pokemones alfabeticamente asc y desc
       if(orderType === "ALF-ASC"){orderPoke.sort((a, b) => a.name.localeCompare(b.name))}
       if(orderType === "ALF-DES"){orderPoke.sort((a, b) => b.name.localeCompare(a.name))}
       //Ordena los pokemones por el attaque asc
       if(orderType === "ATTACK"){ orderPoke.sort((a, b) => a.attack - b.attack)}
    
        return {type: ORDER_POKE, payload: orderPoke }
        
    } catch (error) {
        console.log(error.message);
    }
    
}

export const orderByOrigin = (originOrder, pokemons) =>  {
    try {
        let byOriginPoke;

        if(originOrder === "API"){
            byOriginPoke = pokemons.filter(pokemon => typeof pokemon.id === "number");
        }else if(originOrder === "BDD"){
            byOriginPoke = pokemons.filter(pokemon => typeof pokemon.id === "string");
        }
        console.log(byOriginPoke)


        return {type: ORDER_BY_ORIGIN, payload: byOriginPoke }

        
    } catch (error) {
        console.log(error.message)
    }
}

export const orderByType = (pokemonsCopy, selected) => { //Esta es la funcion que se encarga de filtrar los pokemones
    try {
      const filteredPokemon = pokemonsCopy.filter(pokemon => {
          const matchesSelectedType = selected.length === 0 || 
          selected.every((type) => pokemon.types.includes(type))
          return matchesSelectedType;
      }) //valida por cada uno de los tipos si lo incluye, lo guarda 
      
      return {type: ORDER_BY_TYPE, payload: filteredPokemon}

    } catch (error) {
        console.log(error.message);
    }
}

export const createPoke =  (pokemons) => {
  return async (dispatch) => {
    try {
        const response =  await axios.post(`${endpoint}/pokemon`, {...pokemons});
        
        return dispatch({type: CREATE_POKE, payload: response})

    } catch (error) {
        console.log(error.message);
    }
  }}


export const getTypes =  () => {
    return async (dispatch) => {
        try {
            const {data} = await axios(`${endpoint}/type`);
            return dispatch({type: GET_TYPE, payload: data})

        } catch (error) {
            console.log(error.message);
        }
    }
}