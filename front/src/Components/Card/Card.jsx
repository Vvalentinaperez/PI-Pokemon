import './Card.css'
import {Link} from "react-router-dom"

const Card = ({id, name, image, type}) => {
    return (
        <div className="card">
            <Link to={`detail/${id}`}>
              <h2>{name}</h2>
            </Link>
              <img src={image} alt={name}/>
            <h4>{type}</h4>
          
        </div>
    )
}

export default Card;