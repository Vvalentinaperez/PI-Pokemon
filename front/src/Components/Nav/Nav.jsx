import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import { Link } from "react-router-dom";
const Nav = () => {
    return(
        <div>
           <SearchBar/>
           <Filters/>
           <button>
              <Link to="/home/form">CREA TU PROKEMON</Link>
           </button>
        </div>
    )
}

export default Nav; 