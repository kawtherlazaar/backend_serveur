# TP Postman – API Express.js
###  Objective of TP
---

This project is an API (Application Programming Interface) that performs CRUD operations (Create, Read, Update, Delete) for articles.
In short, it’s an Express.js application connected to a MongoDB database, used to store and display articles.



##  Prerequisites
Before starting, I make sure I have installed:

* **Node.js** and **npm** (Node Package Manager)
* **MongoDB** 
* A  **Visual Studio Code**
* *(Optional)* **Postman** — to test the API endpoints
* **Thunder Client** — a VS Code extension for testing APIs ( I use the thunder)



## Main Components

We use:
 * **Node.js** as the runtime environment
* **Express.js** to build the server and define routes
* **Mongoose** to manage and interact with the MongoDB database
* **Dotenv**  to secure and load sensitive environment variables from the `.env` file


## Implementation steps

### Step 1: Create the Project

I open a new folder with name <u>*backend_serveur*</u>. 
Then, in the terminal, i type:
```
mkdir backend_serveur
cd  backend_serveur
npm init -y 
``` 
🔹This command creates the **package.json**  file to store the project information .
### Step 2: Download the required library
In the terminal  i type:
```
 npm install express mongoose dotenv
``` 
🔹 Express → to create the server  
🔹 Mongoose → to work with the MongoDB database  
🔹 Dotenv → to load environment variables `.env`  
### Step 3: I create this structure
```
backend_server/ 
│
├── controllers
│ └── articlecontroller.js 
│ 
├── db/ 
│ └── connect.js 
│ 
├── models/ 
│ └── article.js 
│ 
├── routes/ 
│ └── articleroutes.js 
│ 
├── index.js 
├── .env 
├── .gitignore 
└── README.md 
```
### Step 4:setting up a database connection 
📁 db/connect.js
```// Importer mongoose
const mongoose = require('mongoose');

// Fonction pour se connecter à la base de données
const connectDB = (MONGODB_URI )=> {
    return mongoose.connect(MONGODB_URI);
};

// Exporter la fonction
module.exports = connectDB;
```
### Step 5:controllers setting 
 📁controllers/articlecontroller.js
 ```const article=require('../models/article');
const getALLArticles =async(req,res) =>{
   try{
    const articles = await Article.find();
    res.status(200).json(articles)
   }catch(err){
    res.status(500).json({message:"erreur lors de la recupation des articles .",error:err.message});
    
   }



 };
 // Création d'un nouvel article avec les données envoyées dans le corps de la requête
 const createArticle=async(req,res) =>{
    try{
 const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });

    // Sauvegarde dans la base de données
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch(err)
  
  {
    res.status(400).json({
      message: "Erreur lors de la création de l’article.",error: err.message});

    }

};
 

// Export des fonctions pour les routes
module.exports = {
 getALLArticles ,
  createArticle
}
```

