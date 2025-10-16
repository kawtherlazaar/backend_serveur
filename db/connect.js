// Importer mongoose
const mongoose = require('mongoose');

// Fonction pour se connecter à la base de données
const connectDB = (UurI )=> {
    return mongoose.connect(urI);
};

// Exporter la fonction
module.exports = connectDB;