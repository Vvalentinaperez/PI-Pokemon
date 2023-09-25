const { Router } = require('express');
const { getPokemons } = require('../controllers/getPokemons');
const { getPokemonById } = require('../controllers/getPokemonById');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemon', getPokemons);
router.get('/pokemon/:id', getPokemonById);


module.exports = router;
