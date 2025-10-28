const article=require('../models/article');
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
