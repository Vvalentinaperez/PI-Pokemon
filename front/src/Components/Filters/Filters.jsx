import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderPokes } from "../../Redux/actions";



const Filters = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderPokes())
    }, []);

    const handleChange = (event) => {
        const orderType = event.target.value;
        dispatch(orderPokes(orderType))
    }

    return (
        <div>
          <select onChange={handleChange}>
              <option value="A">ASCENDENTE</option>
              <option value="D">DESCENDENTE</option>
          </select>
        </div>
    )
}

export default Filters;