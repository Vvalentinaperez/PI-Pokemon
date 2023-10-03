import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokeByName } from "../../Redux/actions";



const SearchBar = () => {

    const [ name, setName ] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const onSearch = () => {
        dispatch(getPokeByName(name))
    }
    
    return (
        <div>
           <input type="search" onChange={handleChange} value={name}/>
           <button onClick={()=> {onSearch()}}>ADD</button>
        </div>
    )
}

export default SearchBar;