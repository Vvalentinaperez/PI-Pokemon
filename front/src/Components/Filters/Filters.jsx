import { useDispatch, useSelector } from "react-redux";
import { orderByOrigin, orderPokes } from "../../Redux/actions";



const Filters = () => {
    const pokemons = useSelector(state => state.myPokemons)
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const orderType = event.target.value;
        dispatch(orderPokes(orderType, pokemons))
    }
    
    const handleChangeOrigin = (event) => {
        const originOrder = event.target.value;
        dispatch(orderByOrigin(originOrder, pokemons))
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