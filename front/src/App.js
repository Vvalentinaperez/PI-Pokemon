import axios from 'axios';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Cards from './Components/Cards/Cards';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';
import About from './Components/About/About';
// import Nav from './Components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// import { useLocation } from 'react-router-dom';




const App = () => {
  
  const [pokemon, setPokemon] = useState([]);
  const URL = "https://pokeapi.co/api/v2/pokemon"
  
  const onSearch = async (name) => {
    try {
      const endpoint = await axios(`${URL}/${name}`)
      if(endpoint){
        setPokemon((oldPoke) => [...oldPoke, endpoint])
      }
    } catch (error) {
      alert("No existen pokemones con ese Name")
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/home' element={<Cards/>}/>
        <Route path='/home/form' element={<Form/>}/>
        <Route path='/home/about' element={<About/>}/>
      </Routes>
    </div>
  );

}

export default App;

//ESTO ES PARA LA SEARCHBAR 
{/* <div  className='navBar'>
   {location.pathname !== "/" && <Nav onSearch={onSearch}/> }
</div> */}

