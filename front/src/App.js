import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Detail from './Components/Detail/Detail';
import Form from './Components/Form/Form';
import About from './Components/About/About';
import Nav from './Components/Nav/Nav';
import SideBar from './Components/SideBar/SideBar';
import BackButton from './Components/Buttons/BackButton';
import Footer from "./Components/Footer/Footer";
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from "react"



const App = () => {
  
  const location = useLocation();

  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  
  const handleBack = () => {
    window.history.back(); 
  }

  return (
    <div className="App">
     <div className="main-content">
      {location.pathname === "/home" && <SideBar isOpen={isOpenSideBar} onToggle={() => setIsOpenSideBar(!isOpenSideBar)} />}


      <div className="navBar">
        {location.pathname !== "/" && !location.pathname.includes("/home/detail/") && location.pathname !== "/home/form" && location.pathname !== "/home/about" && <Nav  isOpenSideBar={isOpenSideBar} onToggle={() => setIsOpenSideBar(!isOpenSideBar)}/> }
      </div>

      <div className='button-box'>
        {location.pathname !== "/" && location.pathname !== "/home" && !location.pathname !== "/home/detail/"  && !location.pathname !== "/home/form"  && <BackButton handleBack={handleBack} />}
      </div>

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home/detail/:id' element={<Detail/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home/form' element={<Form/>}/>
        <Route path='/home/about' element={<About/>}/>
      </Routes>
     </div> 
      <div>
        {location.pathname !== "/" && !location.pathname.includes("/home/detail/") && location.pathname !== "/home/form" && location.pathname !== "/home/about" && <Footer/>}
      </div>
    </div>
  );
  
}

export default App;









