import { GET_POKEMONS, GET_POKE_DETAIL, CLEAN_DETAIL, GET_POKE_BY_NAME } from "./actions-type";

const initialState = {
    myPokemons : [],
    pokeDetail : {}
}


const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state, 
                myPokemons : payload
            }
        case GET_POKE_DETAIL:
            return {
                ...state, 
                pokeDetail: payload
            }
        case CLEAN_DETAIL: 
          return {
            ...state, 
            pokeDetail: {}
          }
        case GET_POKE_BY_NAME: 
          return {
            ...state, 
            myPokemons: payload
          }
        
        default:
           return {... state }
    }
}

export default reducer;