import '../Home/Home.css'
import Card from "../Card/Card"
import Filters from "../Filters/Filters";
import { getPokemons } from "../../Redux/actions" 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.myPokemons);

  const [currentPage, setCurrentPage ] = useState(1); //PAGINACION: Creo un estado para saber en que pagina estoy parado (1 porque empieza en la pagina 1)
  
  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch]);

  //PAGINACION: 12 pokemones por pagina

  const pokemonsForPage = 12;
  const start = (currentPage - 1) * pokemonsForPage; 
  const end = start + pokemonsForPage; 
  const currentPokemons = pokemons?.slice(start, end); 

  const totalPages = Math.ceil(pokemons.length / pokemonsForPage); 

  //currentPage: pagina en la que me encuentro

  const nextPage = () => {
    if(currentPage < totalPages){//Verifica si la pagina en la que me encunetro (currentPage) es menor que el total de paginas. Es decir, verifica si no estoy en la ultima pagina
      setCurrentPage(currentPage + 1)} //Si eso se cumple, aumenta de pagina
  }

  const prevPage = () => { 
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)}
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemons])


    return (
      <div className='backgroung_home'>
           <Filters />
        <div className="cards-wrapper">
          {
            currentPokemons.map(poke => {
              return (
                <Card
                key={poke.id}
                id={poke.id}
                name={poke.name}
                image={poke.image}
                types={poke.types}
                />
              )
            })
          } 
        </div>

        <div className="pagination-container">
            <button className="pagination-btn" onClick={prevPage} disabled={currentPage === 1}>PREV PAGE</button>
            <span className="page-info"> Page {currentPage} / {totalPages} </span>
            <button className="pagination-btn" onClick={nextPage} disabled={currentPage === totalPages}>NEXT PAGE</button>
        </div>
      </div>
        
    )
}

export default Home;