import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import { Link } from "react-router-dom";
const Nav = () => {
   

    const handleBack = () => {
        window.history.back();
    }

    return(
        <div>
           <SearchBar/>
           <Filters/>
           <button>
              <Link to="/home/form">CREA TU PROKEMON</Link>
           </button>
           <button onClick={handleBack}>BACK</button>
           <button>
              <Link to="/home/about">ABOUT</Link>
           </button>
        </div>
    )
}

export default Nav; 