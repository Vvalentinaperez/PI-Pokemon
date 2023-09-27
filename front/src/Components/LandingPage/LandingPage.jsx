import { Link } from "react-router-dom"
const LandingPage = () => {
    return (
        <>
          <h1> LANDING PAGE </h1>
          <button className="button_input">
            <Link to="/home">HOME</Link>
          </button>
        </>
    )
}

export default LandingPage;