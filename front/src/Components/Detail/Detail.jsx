import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokeDetail } from "../../Redux/actions";

const Detail = () => {
  const {id} = useParams();
  const dispatch = useDispatch()
  const pokemonDetail = useSelector(state => state.pokeDetail)


  useEffect(() => {
    dispatch(getPokeDetail(id))
  }, [id])


    return (
        <div>
          <h1>{pokemonDetail?.name}</h1>
          
        </div>
    )
}

export default Detail;