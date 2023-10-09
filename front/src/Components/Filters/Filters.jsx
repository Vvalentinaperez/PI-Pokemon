import "../Filters/Filters.css"
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
    }
    
    const handleChangeOrigin = (event) => {
        const originOrder = event.target.value;
        dispatch(orderByOrigin(originOrder, pokemonsCopy))
    }

    return (
        <div>
          <select className="filter-dropdown" onChange={handleChange}>
              <option value="A"  className="filter-btn">ASC</option>
              <option value="D"  className="filter-btn">DES</option>
              <option value="ALF-ASC" className="filter-btn">ALF ASC</option>
              <option value="ALF-DES" className="filter-btn">ALF DES</option>
              <option value="ATTACK" className="filter-btn">ATTACK</option>
          </select>
          <select className="filter-dropdown" onChange={handleChangeOrigin}>
              <option value="API" className="filter-btn">API</option>
              <option value="BDD" className="filter-btn">BDD</option>
          </select>
        </div>
    )
}

export default Filters;