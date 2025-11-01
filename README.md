#  API Express.js – Data Persistence –CRUD Operations
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

### Step 1 : Create the Project

I open a new folder with name <u>*backend_serveur*</u>. 
Then, in the terminal, i type:
```
mkdir backend_serveur
cd  backend_serveur
npm init -y 
``` 
🔹This command creates the **package.json**  file to store the project information .
### Step 2 : Download the required library
In the terminal  i type:
```
 npm install express mongoose dotenv
``` 
🔹 Express → to create the server  
🔹 Mongoose → to work with the MongoDB database  
🔹 Dotenv → to load environment variables `.env`  
### Step 3 : I create this structure
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
### Step 4 : setting up a database connection 

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
🔹 This code is used to **connect to a MongoDB database** using the **mongoose** library , and then **export the**   connectDB **function** so it can be used in other files of the project .
### Step 5 : setting up a database connection 

📁 models/article.js
```
const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  titer: {
    type: String,
    required: [true, 'Please provide title']
  },
  contenue: {
    type: String,
    required: [true, 'Please provide content']
  },
  imageUrl: {
    type: String
  }
});

module.exports = mongoose.model('Article', articleSchema);

```
🔹This code creates a Mongoose schema for an "Article" model with tree fiedls :**title** , **content**  and **imageUrl** .

### Step 6 : controllers setting 
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
### Step 7 :Routes setting
📁 routes/articleroutes.js
```
const express= require('express');
const router =express.Router();
const {createArticle }= require('../controllers/articlecontroller');
router.post('/',createArticle);
module.exports=express.Router();

```
### Step 8 : index.js setting
📄 index.js 
```
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
        console.error('Error connecting to MongoDB mongo:', error);
    });
```
### Step 9 :   .env setting
📄  .env 
```env 
MONGO_URI=mongodb+srv://<my_user_name>:<my_password>@cluster.mongodb.net/blog 
PORT=3000 
``` 
### Step 10 :   .gitignore setting
📄  .gitignore
```
.env/
node_modules
```
### Step 11 :   Run the project
I open the terminal and because i already installed the **nodemon** ,I type directly :
```
nodemon index.js
```
then I click on the server  👉 [http://localhost:3000/articles](http://localhost:3000/articles)
---

