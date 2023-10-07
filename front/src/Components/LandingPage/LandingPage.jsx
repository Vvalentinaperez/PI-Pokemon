import { Link } from "react-router-dom"
import poke from '../util/pokelanding.png'

import './LandingPage.css'

const LandingPage = () => {
    return (
      <div className="background_landing">
           <img src={poke} className="pokemon_landing"/>
          
             <div >
               <button className="button_landing"> 
                <Link to="/home">HOME</Link>
               </button>
             </div>
      </div>
         
    )
}

export default LandingPage;