require("dotenv").config();
const connectDB=require('./db/connect');
const express = require('express');
const app=express();
const port=process.env.PORT||3000
app.use(express.json());
//const Article =require('./models/article');
const { connect } = require('mongoose');
app.use('/articles' , require('./routes/articleroutes'));
// Importer mongoose et la fonction de connexion
//const mongoose = require('mongoose');


// Connecter la base de données
connectDB(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

