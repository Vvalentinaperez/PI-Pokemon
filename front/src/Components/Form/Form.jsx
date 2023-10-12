import "../Form/Form.css";
import pokeformsen from '../util/pokeformsen.png';
import axios from "axios";
import validation from "../Validation/validation";
import { getTypes } from "../../Redux/actions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";


const Form = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const type = useSelector(state => state.myTypes);
  const [error, setError] = useState({})

  const [ pokemons, setPokemons ] = useState({  //Se inicializa para almacenar datos del Pokemon
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
  
 
  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])


  //Esta funcion ocurre cuando un usuario escribe o selecciona algo en el formulario (son manejadores de eventos)

  const handleChange = (event) => { 
    const {name, value} = event.target;
    setPokemons({
      ...pokemons, 
      [name] : value
    })
    setError(validation(pokemons)) //Actualiza directo el estado y valida el input
  }
  //Verifica si al menos un tipo fue seleccionado
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

  //Al hacer click en el boton se ejecuta, se envian los datos al servidor. Una vez creado me redirige al detalle del pokemon
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

return (
  <div class="formContainerWrapper">
       <img src={pokeformsen} className="pokeformsen"/>
    <div className="formContain">
      <form onSubmit={sendPokemons}>
         <div className="form-sections">

           <div className="left-section">
                  <div className="num-container">
                      <label htmlFor="name">Name: </label>
                      <input type="text" name="name" placeholder="Name" value={pokemons.name} onChange={handleChange}/>
                      {error.name && <p>{error.name}</p>}
                  </div>
                  <div className="num-container">
                      <label htmlFor="image">Image: </label>
                      <input type="text" name="image" accept="image/*" placeholder="Image" value={pokemons.image} onChange={handleChange} /> 
                      {error.image && <p>{error.image}</p>}
                  </div>
              <div className="numeric-section">

                  <div className="numeric-container">
                    <div className="num-container">
                       <label htmlFor="life">Life: </label>
                       <input type="number" name="life" min="0" max="200"value={pokemons.life} onChange={handleChange}/>{error.life && <p>{error.life}</p>}
                    </div>
                    <div className="num-container" >
                       <label htmlFor="speed">Speed: </label>
                       <input type="number" name="speed" min="0" max="200" value={pokemons.speed} onChange={handleChange}/>{error.speed && <p>{error.speed}</p>}
                    </div>
                  </div>

                <div className="numeric-container">  
                  <div className="num-container">
                       <label htmlFor="attack">Attack: </label>
                       <input type="number" name="attack" min="0" max="200" value={pokemons.attack}  onChange={handleChange}/>{error.attack && <p>{error.attack}</p>}
                   </div>
                  <div className="num-container">
                      <label htmlFor="defense">Defense: </label>
                      <input type="number" name="defense" min="0" max="200" value={pokemons.defense} onChange={handleChange}/>{error.defense && <p>{error.defense}</p>}
                  </div>
                </div>
              </div>
           </div>
           <div className="right-section">
            <div className="numeric-section">
              <div className="numeric-container">
                <div className="num-container">
                    <label htmlFor="weight">Weight: </label>
                    <input type="number"  name="weight" min="0" max="200" value={pokemons.weight} onChange={handleChange}/>{error.weight && <p style={{color: "red"}}>{error.weight}</p>}
                </div>
              </div>
              <div className="numeric-container">
                <div className="num-container">
                    <label htmlFor="height">Height: </label>
                    <input type="number" name="height" min="0" max="200" value={pokemons.height}  onChange={handleChange}/>{error.height && <p style={{color: "red"}}>{error.height}</p>}
                </div>
              </div>
            </div>

              <label htmlFor="types">Types: </label>
            <div className="typeContainer">
              <div className="grid">
              {
                type.map(pk => { //Recorre el array de tipos y por cada uno muestra un checkbox y un nombre
                  return (
                    <div className="typeItem" key={pk.id}>
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
              </div>
              {error.types && <p>{error.types}</p>}
            </div>
              <button type="submit" disabled={!pokemons.name || !pokemons.image || !pokemons.types || !pokemons.life || !pokemons.attack || !pokemons.defense || !pokemons.speed || !pokemons.weight || !pokemons.height || error.name ||  error.types || error.life || error.attack || error.defense || error.speed || error.weight || error.height}>SUBMIT</button>
            </div>
         </div>
      </form>
    </div>
  </div>
 )
}


export default Form; 

