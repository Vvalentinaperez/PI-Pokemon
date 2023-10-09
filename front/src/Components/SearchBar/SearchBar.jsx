import "../SearchBar/SearchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokeByName } from "../../Redux/actions";

//Creo un estado que se utilizara para guardar lo que se escriba en el input, lo cual esta inicializado en un string vacio ya que se actualizara el valor depende de lo que escriba el usuario.  Voy a crear una funcion (handleChange) que encargara de modificar ese estado. Esto se lo agregaremos en el input.
//Despues lo que voy a hacer es despachar mi action getPokeByName que contiene la peticion al controlador del back que trae por name. Y eso lo hago en una funcion (onSearch), este evento se realizara en el momento en el que se hace click en el boton. 


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
        <div >
           <input className="search-input" type="search" onChange={handleChange} value={name}/>
           <button className="search-btn" onClick={()=> {onSearch()}}>ADD</button>
        </div>
    )
}

export default SearchBar;