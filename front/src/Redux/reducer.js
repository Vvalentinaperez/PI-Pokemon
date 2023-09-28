import { GET_POKEMONS  } from "./actions-type";

const initialState = {
    myPokemons : []
}


const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_POKEMONS:
            return {
                ...state, 
                myPokemons : payload
            }
        default:
           return {... state }
    }
}

export default reducer;