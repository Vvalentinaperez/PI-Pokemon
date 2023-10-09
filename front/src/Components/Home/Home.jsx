import '../Home/Home.css'
import Card from "../Card/Card"
import Filters from "../Filters/Filters";
import { getPokemons } from "../../Redux/actions" 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"

const Cards = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.myPokemons);
  console.log(pokemons)
  const [currentPage, setCurrentPage ] = useState(1); //PAGINACION: Creo un estado para saber en que pagina estoy parado (1 porque empieza en la pagina 1)
  
  useEffect(() => {
    dispatch(getPokemons())
  }, [])

  //PAGINACION: 12 pokemones por pagina

  const pokemonsForPage = 12;
  const start = (currentPage - 1) * pokemonsForPage; 
  const end = start + pokemonsForPage; 
  const currentPokemons = pokemons?.slice(start, end); 

  const totalPages = Math.ceil(pokemons.length / pokemonsForPage); //Divide la cant total de pokes entre la cantidad de pokes por pagina para determinar cuantas paginas necesitaras en total. El math ceil redondea hacia arriba, asegurando que haya suficientes paginas incluso si hay un residuo. 

  //currentPage: pagina en la que me encuentro

  const nextPage = () => {
    if(currentPage < totalPages){//Verifica si la pagina en la que me encunetro (currentPage) es menor que el total de paginas. Es decir, verifica si no estoy en la ultima pagina
      setCurrentPage(currentPage + 1)} //Si eso se cumple, aumenta de pagina
  }

  const prevPage = () => { 
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)}
  }


    return (
      <div>
           <Filters/>
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
          <button onClick={prevPage} disabled={currentPage === 1}>PREV PAGE</button>
          <span> Page {currentPage} / {totalPages} </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>NEXT PAGE</button>
      </div>
        
    )
}

export default Cards;