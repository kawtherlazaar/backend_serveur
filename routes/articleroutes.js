const express= require('express');
const router =express.Router();
const {createArticle }= require('../controllers/articlecontroller');
router.post('/',createArticle);
module.exports=express.Router();