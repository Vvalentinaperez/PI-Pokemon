import "../Filters/Filters.css"
import { useDispatch, useSelector } from "react-redux";
import { getTypes, orderByOrigin, orderByType, orderPokes } from "../../Redux/actions";
import { useEffect, useState } from "react";

//Despacha la action con los tipos de ordenamientos y el estado con los pokemones, y es la action la que se encarga de filtrarlo o ordenarlos en todo caso. 


const Filters = () => {
    //Esta es la lista completa de Pokemones
    const pokemons = useSelector(state => state.myPokemons)
    //Esta es la lista que se mostrara para los filtros
    const pokemonsCopy = useSelector(state => state.copyPokemons)

    const [selectedType, setSelectedType] = useState([]);
    const [showTypesMenus, setsShowTypesMenus] = useState(false);
    const types = useSelector(state => state.myTypes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes()) 
    }, [dispatch])
   
    

    const handleChange = (event) => {
        const orderType = event.target.value;
        dispatch(orderPokes(orderType, pokemons))
    }
    
    const handleChangeOrigin = (event) => {
        const originOrder = event.target.value;
        dispatch(orderByOrigin(originOrder, pokemonsCopy))
    }


    const handleTypeChange = (event) => {  //Esta es mi funcion es la que guarda en un array con los seleccionados 
       const typeName = event.target.value; 
       let selected;

       if(selectedType.includes(typeName)){ 
         setSelectedType(selectedType.filter((type) => type !== typeName))  //Es lo que actualiza el estado 
         selected = selectedType.filter((type) => type !== typeName)  //Es lo que le mando al dispatch
       }else{
         setSelectedType([...selectedType, typeName]);
         selected = [...selectedType, typeName]
       }
    
       dispatch(orderByType(pokemonsCopy, selected));
       console.log(selected);
    }
       

    return (
        <div className="filters-wrapper">
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
          <div className="types-dropdown">
            <button className="types-dropdown-button filter-btn" onClick={
                () => {setsShowTypesMenus(!showTypesMenus)}
            }>TYPES</button>
            {showTypesMenus && (
                <div className="types-menu">
                    {
                        types.map((type) => ( //1-Renderiza los typos y le puse un estado para que guarde los que estan seleccionados y los que no
                            <div key={type.id}>
                                <input 
                                type="checkbox" 
                                value={type.name}
                                checked={selectedType.includes(type.name)}
                                onChange={handleTypeChange}
                                ></input>
                                <label>{type.name}</label>
                            </div>
                        ))
                    }
                </div>
            )}
          </div>
        </div>
    )
}

export default Filters;