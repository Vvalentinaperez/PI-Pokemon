import SearchBar from "../SearchBar/SearchBar";
import ToogleButton from "../Buttons/ToogleButton"
import "../Nav/Nav.css"



const Nav = ({ isOpenSideBar, onToggle }) => {
   
    return(
        <div  className="navContainer">
            <ToogleButton onClick={onToggle} isOpen={isOpenSideBar}/>
          <div className="search-container">
            <SearchBar/>
          </div>
        </div>
    )
}

export default Nav; 