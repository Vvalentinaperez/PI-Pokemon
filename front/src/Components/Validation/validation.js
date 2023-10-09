const validation = (pokemons) => {
  const error = {};
  const regex = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)$/;

  if(!pokemons.name){
    error.name = "Debe ingresar un nombre";
  }

  if(!pokemons.image || !regex.test(pokemons.image)){
    error.image = "Debe ingresar una imagen";
  }


  if(pokemons.life === 0){
    error.life = "Debe ingresar un numero de vida";
  }

  if(pokemons.attack === 0){
    error.attack = "Debe ingresar un numero para el ataque";
  }
  if(pokemons.defense === 0){
    error.defense = "Debe ingresar un numero para la defensa";
  }

  if(pokemons.speed === 0){
    error.speed = "Debe ingresar un numero para la velocidad";
  }

  if(pokemons.weight === 0){
    error.weight = "Debe ingresar un numero para el peso";
  }

  if(pokemons.height === 0){
    error.height = "Debe ingresar un numero para la altura";
  }

  return error;
}

export default validation;