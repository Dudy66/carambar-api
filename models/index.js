'use strict';

const fs = require('fs'); 
const path = require('path'); 
const Sequelize = require('sequelize'); 
const process = require('process'); 
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Je crée une instance Sequelize avec les paramètres de config
let sequelize;
if (config.use_env_variable) {
  // Si j’utilise une variable d’environnement (par ex. pour Render)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Sinon je me connecte avec les infos du fichier config.json
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // J’importe chaque modèle et je l’ajoute à l’objet db
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Si un modèle a des associations (liens avec d’autres modèles), je les initialise ici
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Je stocke l’instance Sequelize et le module Sequelize dans l’objet db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// J’exporte l’objet db avec tous les modèles et la connexion
module.exports = db;
