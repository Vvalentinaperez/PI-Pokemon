import { useDispatch, useSelector } from "react-redux";
import { orderByOrigin, orderPokes } from "../../Redux/actions";



const Filters = () => {
    //Esta es la lista completa de Pokemones
    const pokemons = useSelector(state => state.myPokemons)
    //Esta es la lista que se mostrara para los filtros
    const pokemonsCopy = useSelector(state => state.copyPokemons)

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const orderType = event.target.value;
        dispatch(orderPokes(orderType, pokemons))
        console.log(orderPokes)
    }
    
    const handleChangeOrigin = (event) => {
        const originOrder = event.target.value;
        dispatch(orderByOrigin(originOrder, pokemonsCopy))
    }

    return (
        <div>
          <select onChange={handleChange}>
              <option value="A">ASC</option>
              <option value="D">DES</option>
              <option value="ALF-ASC">ALF ASC</option>
              <option value="ALF-DES">ALF DES</option>
              <option value="ATTACK">ATTACK</option>
          </select>
          <select onChange={handleChangeOrigin}>
              <option value="API">API</option>
              <option value="BDD">BDD</option>
          </select>
        </div>
    )
}

export default Filters;