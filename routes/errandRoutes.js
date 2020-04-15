const express = require("express");
const router = express.Router();
const errandController = require("../controller/errandController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const errandSchema = require("../apiSchema/errandSchema");
const tokenValidation = require('../middleware/tokenValidation');

router.post('/', 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(errandSchema.createErrandSchema), 
productController.createProduct);

router.get('/:id', 
tokenValidation.validateToken,
errandController.getProductById);

router.put('/:id', 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(productSchema.updateProductSchema),
productController.updateProductById);

router.get('/',
tokenValidation.validateToken, 
joiSchemaValidation.validateQueryParams(productSchema.getAllproductSchema),
errandController.getAllProduct); 

router.delete('/:id', 
tokenValidation.validateToken,
productController.deleteProductById);

module.exports = router;