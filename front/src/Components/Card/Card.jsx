import './Card.css'
import {Link} from "react-router-dom"

const Card = ({id, name, image, type}) => {
    return (
        <div className="card">
          <img src={image} alt={name}/>
          <div className="card-content">
            <Link to={`detail/${id}`}>
              <h2>{name}</h2>
            </Link>
            <h4>{type}</h4>
          </div>
        </div>
    )
}

export default Card;