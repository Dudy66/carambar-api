'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Je crée une classe Joke qui hérite des fonctionnalités de base de Sequelize
  class Joke extends Model {
    static associate(models) {
    }
  }
  Joke.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Joke'
    }
  );
  return Joke;
};
