import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Cards from './Components/Cards/Cards';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';
import About from './Components/About/About';
import Nav from './Components/Nav/Nav';
import { Routes, Route, useLocation } from 'react-router-dom';




const App = () => {
  
  const location = useLocation();
  
  return (
    <div className="App">
      <div  className='navBar'>
         {location.pathname !== "/" && <Nav/> }
      </div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home/detail/:id' element={<Detail/>}/>
        <Route path='/home' element={<Cards/>}/>
        <Route path='/home/form' element={<Form/>}/>
        <Route path='/home/about' element={<About/>}/>
      </Routes>
    </div>
  );
  
}

export default App;









