const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');


router.post('/jokes', jokeController.createJoke);
router.get('/jokes', jokeController.getAllJokes);
router.get('/jokes/random', jokeController.getRandomJoke);
router.get('/jokes/:id', jokeController.getJokeById);


module.exports = router;
