import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../Redux/actions" 
import Card from "../Card/Card"
import './Cards.css'

const Cards = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.myPokemons);

  useEffect(() => {
    dispatch(getPokemons())
  }, [])


    return (
      <div>
          <h1>HOME</h1>
        <div className="cards-wrapper">
          {
            pokemons.map(poke => {
              return (
                <Card
                  key={poke.id}
                  name={poke.name}
                  image={poke.sprites && poke.sprites.front_default ? poke.sprites.front_default: "C:\Users\valen\Downloads\imagenes Pokemon\thumb-201718.png" }
                  type={poke.types.map(tipo => tipo.type.name)}
                />
              )
            })
          } 
        </div>
      </div>
        
    )
}

export default Cards;