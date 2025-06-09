const { Joke } = require('../models');

exports.createJoke = async (req, res) => {
  try {
    // Je récupère la question et la réponse envoyées dans la requête
    const { question, answer } = req.body;

    // Je crée une nouvelle blague dans la base de données avec ces infos
    const joke = await Joke.create({ question, answer });

    // Je renvoie la blague créée 
    res.status(201).json(joke);
  } catch (error) {
    // En cas d’erreur
    res.status(500).json({ error: error.message });
  }
};

exports.getAllJokes = async (req, res) => {
  try {

    const jokes = await Joke.findAll();

    res.json(jokes);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};


exports.getJokeById = async (req, res) => {
  try {
    // Je cherche une blague qui a l’ID fourni dans l’URL
    const joke = await Joke.findByPk(req.params.id);

    if (joke) {
      res.json(joke);
    } else {
      res.status(404).json({ error: 'Blague non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRandomJoke = async (req, res) => {
  try {
    // Je compte combien de blagues il y a dans la base
    const count = await Joke.count();

    // Je choisis un index au hasard entre 0 et count - 1
    const randomIndex = Math.floor(Math.random() * count);

    // Je récupère une blague au hasard en sautant randomIndex lignes
    const joke = await Joke.findOne({ offset: randomIndex });

    res.json(joke);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
