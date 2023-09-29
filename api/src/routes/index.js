const { Router } = require('express');
const { getPokemons } = require('../controllers/getPokemons');
const { getPokemonById } = require('../controllers/getPokemonById');
const { getPokemonByName } = require('../controllers/getPokemonByName');
const { getType } = require('../controllers/getTypes');
const { postPokemons } = require('../controllers/postPokemons');


const router = Router();


router.get('/pokemon/name', getPokemonByName);
router.get('/pokemon/:id', getPokemonById);
router.get('/pokemon', getPokemons);
router.get('/type', getType);
router.post('/pokemon', postPokemons)


module.exports = router;
