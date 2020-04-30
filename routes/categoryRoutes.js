const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post('/', categoryController.createCategory);

router.get('/:id', categoryController.getCategoryById);

router.put('/:id', categoryController.updateCategoryById);

router.get('/', categoryController.getAllCategory); 

router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;