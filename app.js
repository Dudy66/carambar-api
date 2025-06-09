const express = require('express');
const cors = require('cors');
const app = express();


const jokeRoutes = require('./routes/jokeRoutes');

// J’importe Swagger UI pour afficher la documentation de mon API dans le navigateur
const swaggerUi = require('swagger-ui-express');

// J’importe le fichier JSON qui contient la doc Swagger de mes endpoints
const swaggerDocument = require('./swagger/swagger.json');

app.use(cors());
app.use(express.json());

//Je mets /api/v1 pour versionner mon API.//
app.use('/api/v1', jokeRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Je rends mon app exportable, pour pouvoir la démarrer dans server.js
module.exports = app;
