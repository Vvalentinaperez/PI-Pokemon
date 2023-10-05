import { GET_POKEMONS, GET_POKE_DETAIL, CLEAN_DETAIL, GET_POKE_BY_NAME, ORDER_POKE, ORDER_BY_ORIGIN, CREATE_POKE} from "./actions-type";

const initialState = {
    myPokemons : [],
    copyPokemons: [],
    pokeDetail : {}
}


const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state, 
                myPokemons : payload, 
                copyPokemons: payload
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
            copyPokemons: payload
          }
        case ORDER_POKE: 
          return {
            ...state, 
            myPokemons: payload
          }
        case ORDER_BY_ORIGIN:
          return {
            ...state, 
            // myPokemons: [payload, ...state.myPokemons], 
            copyPokemons: [payload, ...state.myPokemons]
          }
        case CREATE_POKE: 
          return {
            ...state, 
            myPokemons: [payload, ...state.myPokemons], 
            copyPokemons: [payload, ...state.myPokemons]
          }
       
        
        default:
           return {... state }
    }
}

export default reducer;