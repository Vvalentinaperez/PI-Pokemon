import { Link } from "react-router-dom";
import "../SideBar/SideBar.css"



const SideBar = ({ isOpen}) => {
    return (
        <div className={`sideBar ${isOpen ? 'open' : ''}`}>
            <Link to="/home/form" className="sideLink">Crea tu Pokemon</Link>
            <Link to="/home/about" className="sideLink">About Me</Link>
        </div>
    );
}

export default SideBar;