import { Link } from "react-router-dom"
import './LandingPage.css'

const LandingPage = () => {
    return (
          <div className="button.landing">
            <button >
              <Link to="/home">HOME</Link>
            </button>
        </div>
    )
}

export default LandingPage;