import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPoke } from "../../Redux/actions";
import axios from "axios";




const Form = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ pokemons, setPokemons ] = useState({
    name: "",
    image: "", 
    life: 0, 
    attack: 0, 
    defense: 0, 
    speed: 0, 
    height: 0, 
    weight: 0, 
  })

  const sendPokemons = async (event) => {
    event.preventDefault()
    const pokemon = {...pokemons}
    try {
      // Usar axios directamente
      const response = await axios.post(`http://localhost:3001/pokemon`, pokemon);

      if (response.data && response.data.id) {
          navigate(`/detail/${response.data.id}`);
      } else {
          console.error("El servidor no proporcionó un ID para el Pokémon creado.");
      }
  } catch (error) {
      console.error("Error al crear Pokémon:", error);
  }
  } 

  const handleChange = (event) => {
    setPokemons({
      ...pokemons, 
      [event.target.name] : event.target.value
    })
    
  
  }

    return (
        <form onSubmit={sendPokemons}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" onChange={handleChange}/>
          <hr/>
            <label htmlFor="image">IMAGE: </label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          <hr/>
            <label htmlFor="types">TYPES: </label>
            <input type="text" name="types" onChange={handleChange} />
          <hr/>
            <label htmlFor="life">LIFE: </label>
            <input type="range" name="life" min="0" max="500" onChange={handleChange}/>
          <hr/>
            <label htmlFor="attack">ATTACK: </label>
            <input type="range" name="attack" min="0" max="500"  onChange={handleChange}/>
          <hr/>
            <label htmlFor="defense">DEFENSE: </label>
            <input type="range" name="defense" min="0" max="500" onChange={handleChange}/>
          <hr/>
            <label htmlFor="speed">SPEED: </label>
            <input type="range" name="speed" min="0" max="500" onChange={handleChange}/>
          <hr/>
            <label htmlFor="weight">WEIGHT: </label>
            <input type="range" name="weight" min="0" max="500" onChange={handleChange}/>
          <hr/>
            <label htmlFor="height">HEIGHT: </label>
            <input type="range" name="height" min="0" max="500"  onChange={handleChange}/>
          <hr/>
            <button type="submit">SUBMIT</button>
        </form>
    )
}


export default Form; 


