import { useDispatch, useSelector } from "react-redux";
import { orderPokes } from "../../Redux/actions";



const Filters = () => {
    const pokemons = useSelector(state => state.myPokemons)
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const orderType = event.target.value;
        dispatch(orderPokes(orderType, pokemons))
    }
    //orderType: son los tipos de ordenamiento
    //pokemons: mis pokemones del estado global

    return (
        <div>
          <select onChange={handleChange}>
              <option value="A">ASC</option>
              <option value="D">DES</option>
              <option value="ALF-ASC">ALF ASC</option>
              <option value="ALF-DES">ALF DES</option>
              <option value="ATTACK">ATTACK</option>
          </select>
        </div>
    )
}

export default Filters;