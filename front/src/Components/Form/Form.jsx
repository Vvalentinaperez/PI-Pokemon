import axios from "axios";
import "../Form/Form.css"
import validation from "../Validation/validation";
import { getTypes } from "../../Redux/actions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";


//Duda: cuando es necesario poner algo en el array de dependencias y cuando no

const Form = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const type = useSelector(state => state.myTypes);

 
  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])


  const [ pokemons, setPokemons ] = useState({
    name: "",
    image: "", 
    types: [],
    life: 0, 
    attack: 0, 
    defense: 0, 
    speed: 0, 
    height: 0, 
    weight: 0, 
  })

  const [error, setError] = useState({})

  const endpoint = process.env.REACT_APP_URL

  const sendPokemons = async (event) => {
    event.preventDefault()
    try {
      // Usar axios directamente
      const response = await axios.post(`${endpoint}/pokemon`, {...pokemons});

      if (response.data && response.data.id) {
          navigate(`/home/detail/${response.data.id}`);
      } else {
          console.log("El servidor no proporcionó un ID para el Pokémon creado.");
      }
  } catch (error) {
      console.log("Error al crear Pokémon:", error);
  }
  } 

  const handleChange = (event) => {
    const {name, value} = event.target;

    setPokemons({
      ...pokemons, 
      [name] : value
    })

    setError(validation(pokemons))
  }

  const handleChangeType = (event) => {
    const tpName = event.target.value;
    const isChecked = event.target.checked;

    let updateTypes;

    if(isChecked){
      updateTypes = [...pokemons.types, tpName];
    }else{
      updateTypes = pokemons.types.filter((tps) => tps !== tpName);
    }

    setPokemons({...pokemons, types: updateTypes});
    console.log(pokemons);

    const handleType = updateTypes.length <= 0;
    if(handleType){
      setError((error) => ({
        ...error, 
        types: "Por favor selecciona al menos un genero"
      }));
    }else{
      setError((error) => ({
        ...error, 
        types: ""
      }))
    }
  }

    return (
      <div class="center-container">
      <div className="detallePoke">
        <form onSubmit={sendPokemons}>
          <div className="form-sections">

            <div className="left-section">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" placeholder="Name" value={pokemons.name} onChange={handleChange}/>{error.name && <p style={{color: "red"}}>{error.name}</p>}
        
            <label htmlFor="image">Image: </label>
            <input type="text" name="image" accept="image/*" placeholder="Image" value={pokemons.image} onChange={handleChange} /> {error.image && <p style={{color: "red"}}>{error.image}</p>}
          
         
            <label htmlFor="life">Life: </label>
            <input type="number" name="life" min="0" max="200"value={pokemons.life} onChange={handleChange}/>{error.life && <p style={{color: "red"}}>{error.life}</p>}
         
            <label htmlFor="attack">Attack: </label>
            <input type="number" name="attack" min="0" max="200" value={pokemons.attack}  onChange={handleChange}/>{error.attack && <p style={{color: "red"}}>{error.attack}</p>}
          
            <label htmlFor="defense">Defense: </label>
            <input type="number" name="defense" min="0" max="200" value={pokemons.defense} onChange={handleChange}/>{error.defense && <p style={{color: "red"}}>{error.defense}</p>}
       
            <label htmlFor="speed">Speed: </label>
            <input type="number" name="speed" min="0" max="200" value={pokemons.speed} onChange={handleChange}/>{error.speed && <p style={{color: "red"}}>{error.speed}</p>}
            <label htmlFor="weight">Weight: </label>
            <input type="number" name="weight" min="0" max="200" value={pokemons.weight} onChange={handleChange}/>{error.weight && <p style={{color: "red"}}>{error.weight}</p>}
         
            <label htmlFor="height">Height: </label>
            <input type="number" name="height" min="0" max="200" value={pokemons.height}  onChange={handleChange}/>{error.height && <p style={{color: "red"}}>{error.height}</p>}
            </div>

            <div className="right-section">
            <div className="grid">
              <label htmlFor="types">Types: </label>
              {
                type.map(pk => {
                  return (
                    <div key={pk.id}>
                      <input
                        type="checkbox" 
                        value={pk.name}
                        checked={pokemons.types.includes(pk.name)} 
                        onChange={handleChangeType}
                      />
                      <span name={pk.name}>{pk.name}</span>
                    </div>
                  )
                })
              }
            </div>{error.types && <p style={{color: "red"}}>{error.types}</p>}
            <button type="submit" disabled={!pokemons.name || !pokemons.image || !pokemons.types || !pokemons.life || !pokemons.attack || !pokemons.defense || !pokemons.speed || !pokemons.weight || !pokemons.height || error.name ||  error.types || error.life || error.attack || error.defense || error.speed || error.weight || error.height}>SUBMIT</button>
              </div>
            </div>
            
       
        </form>
      </div>
    </div>
    )
}


export default Form; 


// <label htmlFor="types">Types: </label>
// <input type="text" name="types" placeholder="Types" value={pokemons.types} onChange={handleChange} />{error.types && <p style={{color: "red"}}>{error.types}</p>}