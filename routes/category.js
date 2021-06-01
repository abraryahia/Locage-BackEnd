const express = require('express');
const router = express.Router();
const { retrieveAllCategories, createCategory, retrieveSubcategoriesOfCategory, createSubcategory} = require('../services/category');
const authjwt = require("../middlewares/authjwt");


router.route('/')
    .get(getCategories)
    .post(authjwt, createnewCategory);

router.patch('/:id', authjwt, )

router.route('/:id/subcategory')
    .get(getSubcategories)
    .post(authjwt, createNewSubcategory);


function getCategories(req, res, next){
    retrieveAllCategories().then(result => res.json({result: result}))
    .catch(error => next(error));
}

function createnewCategory (req, res, next){
    const { body: category, userId } = req;
    createCategory(category, userId).then(result => { 
        res.status(201).json({message: "Category has been added.", result: result});
    })
    .catch(error => next(error));
}

function getSubcategories(req, res, next){
    const { id: categoryId } = req.params;
    retrieveSubcategoriesOfCategory(categoryId).then(result => res.json({result: result}))
    .catch(error => next(error));
}

function createNewSubcategory(req, res, next){
    const { body: subcategory, userId } = req;
    const { id: categoryId } = req.params;
    createSubcategory(subcategory, categoryId, userId).then(result => {
        res.status(201).json({message: "Subcategory has been added.", result: result});
    })
    .catch(error => next(error));
}


module.exports = router;