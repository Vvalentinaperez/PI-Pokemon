import { GET_POKEMONS, GET_POKE_DETAIL, CLEAN_DETAIL, GET_POKE_BY_NAME, ORDER_POKE, ORDER_BY_ORIGIN, CREATE_POKE, GET_TYPE} from "./actions-type";

//Duda: en que momento poner un array y en que momento poner un objeto? 
const initialState = {
    myPokemons : [],
    copyPokemons: [],
    pokeDetail : {}, 
    myTypes: []
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
            myPokemons: payload
          }
        case ORDER_POKE: 
          return {
            ...state, 
            myPokemons: payload
          }
        case ORDER_BY_ORIGIN:
          return {
            ...state,
            myPokemons: payload
          }
        case CREATE_POKE: 
          return {
            ...state, 
            myPokemons: [payload, ...state.myPokemons], 
            copyPokemons: [payload, ...state.myPokemons]
          }
        case GET_TYPE: 
          return {
            ...state, 
            myTypes: payload
          }
        
        default:
           return {... state }
    }
}

export default reducer;