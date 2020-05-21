const express = require("express");
const router = express.Router();
const errandController = require("../controller/errandController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const errandSchema = require("../apiSchema/errandSchema");
const bidSchema = require("../apiSchema/bidSchema");
const tokenValidation = require('../middleware/tokenValidation');

router.post('/', 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(errandSchema.createErrandSchema), 
errandController.createErrand);

router.get('/:id', 
tokenValidation.validateToken,
errandController.getErrandById);

router.put('/:id', 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(errandSchema.updateErrandSchema),
errandController.updateErrandById);

router.get('/',
tokenValidation.validateToken, 
joiSchemaValidation.validateQueryParams(errandSchema.getAllErrandSchema),
errandController.getAllErrand); 

router.delete('/:id', 
tokenValidation.validateToken,
errandController.deleteErrandById);

router.post('/bid/:id', 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(bidSchema.bidSchema), 
errandController.postBid);

router.get('/bid/:id', 
tokenValidation.validateToken,
errandController.getBid);

router.delete('/bid/:id', 
tokenValidation.validateToken,
errandController.deleteBid);

module.exports = router;