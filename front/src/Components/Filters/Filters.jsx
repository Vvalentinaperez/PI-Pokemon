const orderPokes = require("../../Redux/actions")
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const Filters = () => {

    const dispatch = useDispatch();
    const ordePoke = useSelector(state => state.myPokemons);

    useEffect(() => {
        dispatch(orderPokes())
    }, []);

    return (
        <div>
          <select onChange={ordePoke}>
              <option value="A">ASCENDENTE</option>
              <option value="D">DESCENDENTE</option>
          </select>
        </div>
    )
}

export default Filters;