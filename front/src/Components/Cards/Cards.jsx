import { getPokemons } from "../../Redux/actions" 
import Card from "../Card/Card"
import './Cards.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"

const Cards = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.myPokemons);
  const [currentPage, setCurrentPage ] = useState(1); //PAGINACION: Creo un estado para saber en que pagina estoy parado (1 porque empieza en la pagina 1)
  
  useEffect(() => {
    dispatch(getPokemons())
  }, [])

  //PAGINACION: 12 pokemones por pagina

  const pokemonsForPage = 12;
  const start = (currentPage - 1) * pokemonsForPage; 
  const end = start + pokemonsForPage; 
  const currentPokemons = pokemons.slice(start, end); 

  

  const nextPage = () => { //Nos lleva a la pagina siguiente
    setCurrentPage(prevPage => prevPage + 1);
  }

  const prevPage = () => { //Nos lleva a la pagina anterior
    setCurrentPage(prevPage => prevPage - 1);
  }


    return (
      <div>
          <h1>HOME</h1>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(pokemons.length / pokemonsForPage)}>NEXT PAGE</button>
              <button onClick={prevPage}>PREV PAGE</button>
        <div className="cards-wrapper">
          {
            currentPokemons.map(poke => {
              return (
                <Card
                  key={poke.id}
                  id={poke.id}
                  name={poke.name}
                  image={poke.image}
                  type={poke.type}
                  life={poke.life}
                  attack={poke.attack}
                  defense={poke.defense}
                  speed={poke.speed}
                  weight={poke.weight}
                  height={poke.height}
                />
              )
            })
          } 
        </div>
      </div>
        
    )
}

export default Cards;