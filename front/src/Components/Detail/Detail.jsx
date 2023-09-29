import './Detail.css';
import { useParams } from "react-router-dom";
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
        <div >
          <div className='detallePoke'>
            <div className='detalleImagen'>
              <img src={pokemonDetail.image} alt={pokemonDetail.name}/> 
            </div>
           
            <h1>Name: {pokemonDetail?.name}</h1>
            <h2>Types: {pokemonDetail?.type}</h2>
            <h3>Life: {pokemonDetail?.life}</h3>
            <h3>Attack: {pokemonDetail?.attack}</h3>
            <h3>Defense: {pokemonDetail?.defense}</h3>
            <h3>Speed: {pokemonDetail?.speed}</h3>
            <h3>Weight: {pokemonDetail?.weight}</h3>
            <h3>Height: {pokemonDetail?.height}</h3>
          </div>
          
        </div>
    )
}

export default Detail;