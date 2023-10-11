import './Detail.css';
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokeDetail, cleanDetail } from "../../Redux/actions";

const Detail = () => {
  const {id} = useParams();
  const dispatch = useDispatch()
  const pokemonDetail = useSelector(state => state.pokeDetail)
 
  
  useEffect(() => {
    dispatch(getPokeDetail(id))

    return () => dispatch(cleanDetail())
  }, [id])


  return (
    <div className='detalle'>
              <Link to="/home" className="button_detail">
                 <button className="search-btn"> 
                  HOME
                 </button> 
              </Link>
        <div className='detallePoke'>
            <div className='detalleImagen'>
                <img id={pokemonDetail?.id} src={pokemonDetail?.image} alt={pokemonDetail?.name}/> 
            </div>

            <div className='detalleInfo'>
                <h1>{pokemonDetail?.name}</h1>
                <h2>Types:</h2>
                  {Array.isArray(pokemonDetail?.types) && pokemonDetail?.types.map(type => (
                  <span key={type}>{type}</span>
                 ))}
            </div>

            <div className='detalleProps'>
                <div>
                    <h3>Life</h3>
                    <p>{pokemonDetail?.life}</p>
                </div>
                <div>
                    <h3>Attack</h3>
                    <p>{pokemonDetail?.attack}</p>
                </div>
                <div>
                    <h3>Defense</h3>
                    <p>{pokemonDetail?.defense}</p>
                </div>
                <div>
                    <h3>Speed</h3>
                    <p>{pokemonDetail?.speed}</p>
                </div>
                <div>
                    <h3>Weight</h3>
                    <p>{pokemonDetail?.weight}</p>
                </div>
                <div>
                    <h3>Height</h3>
                    <p>{pokemonDetail?.height}</p>
                </div>
            </div>
        </div>
    </div>
);
}

export default Detail;


