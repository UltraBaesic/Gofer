const express = require('express');
const router = express.Router();
const userController = require("../controller/userController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const userSchema = require("../apiSchema/userSchema");
const tokenValidation = require('../middleware/tokenValidation');

router.post('/register', 
joiSchemaValidation.validateBody(userSchema.createUserSchema), 
userController.createUser);

router.post('/login', 
joiSchemaValidation.validateBody(userSchema.login), 
userController.login);

router.get('/profile/:id', 
tokenValidation.validateToken,
userController.getProfileById);

router.put('/profile/:id', 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(userSchema.updateUserSchema),
userController.updateProfileById);

router.delete('/profile/:id', 
tokenValidation.validateToken,
userController.deleteProfileById);

router.post("/change-password", 
tokenValidation.validateToken, 
userController.changePassword);

router.post("/check-code", 
userController.checkCode);

module.exports = router;