// Importer mongoose
const mongoose = require('mongoose');

// Fonction pour se connecter à la base de données
const connectDB = (MONGODB_URI )=> {
    return mongoose.connect(MONGODB_URI);
};

// Exporter la fonction
module.exports = connectDB;