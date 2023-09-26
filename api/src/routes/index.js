const { Router } = require('express');
const { getPokemons } = require('../controllers/getPokemons');
const { getPokemonById } = require('../controllers/getPokemonById');
const { getPokemonByName } = require('../controllers/getPokemonByName');
const { getType } = require('../controllers/getTypes');


const router = Router();


router.get('/pokemon', getPokemons);
router.get('/pokemon/:id', getPokemonById);
router.get('/pokemon', getPokemonByName);
router.get('/type', getType);


module.exports = router;
