const validation = (pokemons) => {
  const error = {};
  const regex = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)$/;

  if(!pokemons.name){
    error.name = "Debe ingresar un name";
  }else{
    error.name = "";
  }

  if(!pokemons.image || !regex.test(pokemons.image)){
    error.image = "Debe ingresar una imagen";
  }else{
    error.image = "";
  }


  if(pokemons.life === 0){
    error.life = "Debe ingresar un numero de vida";
  }else{
    error.life = "";
  }

  if(pokemons.attack === 0){
    error.attack = "Debe ingresar un numero para el ataque";
  }else{
    error.attack = "";
  }

  if(pokemons.defense === 0){
    error.defense = "Debe ingresar un numero para la defensa";
  }else{
    error.defense = "";
  }

  if(pokemons.speed === 0){
    error.speed = "Debe ingresar un numero para la velocidad";
  }else{
    error.speed = "";
  }

  if(pokemons.weight === 0){
    error.weight = "Debe ingresar un numero para el peso";
  }else{
    error.weight = "";
  }

  if(pokemons.height === 0){
    error.height = "Debe ingresar un numero para la altura";
  }else{
    error.height = "";
  }

  return error;
}

export default validation;