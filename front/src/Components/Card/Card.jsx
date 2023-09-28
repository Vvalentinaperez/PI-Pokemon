import './Card.css'
const Card = ({name, image, type}) => {
    return (
        <div className="card">
          <img src={image} alt={name}/>
          <div className="card-content">
            <h2>{name}</h2>
            <h4>{type}</h4>
          </div>
        </div>
    )
}

export default Card;