import SearchBar from "../SearchBar/SearchBar";
import "../Nav/Nav.css"



const Nav = () => {
    const handleBack = () => {
        window.history.back();
    }

    return(
        <div  className="navContainer">
            <div className="searchBar">
              <SearchBar/>
            </div>
           <button onClick={handleBack}>BACK</button>
        </div>
    )
}

export default Nav; 