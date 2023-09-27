import { Link } from "react-router-dom";
const Home = () => {
    return (
        <>
          <h1> HOME </h1>
          <button className="button_home">
            <Link to="/detail/:id">DETAIL</Link>
          </button>
        </>
    )
}

export default Home;