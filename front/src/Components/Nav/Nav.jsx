import SearchBar from "../SearchBar/SearchBar";
import ToogleButton from "../Buttons/ToogleButton"
import "../Nav/Nav.css"
import { Link } from "react-router-dom";



const Nav = ({ isOpenSideBar, onToggle }) => {

    return(
        <div  className="navContainer">
            <ToogleButton onClick={onToggle} isOpen={isOpenSideBar}/>
          <div className="search-container">
            <SearchBar/>
          </div>
          <Link to="/home" className="button_home">
                 <button className="search-btn"> 
                  HOME
                 </button> 
              </Link>
        </div>
    )
}

export default Nav; 