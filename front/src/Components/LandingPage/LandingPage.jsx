import { Link } from "react-router-dom"
import poke from '../util/pokelanding.png'

import './LandingPage.css'

const LandingPage = () => {
    return (
      <div className="background_landing">
           <img src={poke} className="pokemon_landing"/>
          
             <div >

              <Link to="/home" className="button_land">
                 <button className="button_landing"> 
                  HOME
                 </button> 
              </Link>
             </div>
      </div>
         
    )
}

export default LandingPage;