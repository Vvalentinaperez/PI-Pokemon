import { Link } from "react-router-dom";
import "../SideBar/SideBar.css"
import ToggleButton from "../ToogleButton/ToogleButton";


const SideBar = ({ isOpen, onToggle }) => {
    return (
        <div className={`sideBar ${isOpen ? 'open' : ''}`}>
            <Link to="/home/form" className="sideLink">Crea tu Pokemon</Link>
            <Link to="/home/about" className="sideLink">About Me</Link>
        </div>
    );
}

export default SideBar;