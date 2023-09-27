import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Cards from './Components/Cards/Cards';
import Detail from './Components/Detail/Detail';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/Cards' element={<Cards/>}/>
      </Routes>
    </div>
  );
}

export default App;
