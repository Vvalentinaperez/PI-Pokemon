import { GET_POKEMONS, GET_POKE_DETAIL  } from "./actions-type";

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
        default:
           return {... state }
    }
}

export default reducer;