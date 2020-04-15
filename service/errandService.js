const Errand = require('../database/models/errandModel');
const {formatMongoData, chkObjectId} = require('../helper/dbHelper');
const constants = require('../constants');
const mongoose = require('mongoose');
const {User} = require('../database/models/userModel');

mongoose.set('useFindAndModify', false);

module.exports.createErrand = async (req, res) => {
    try{
        let {category, pickupLocation, deliveryLocation, description, amount, deadlineDate, insurance} = req.body;
        let dupErrand  = await Errand.findOne({ $or: [{ category }, { description }, { pickupLocation }, { deliveryLocation }] });
        if (dupErrand) return res.send({
            code: 400,
            message: "Errand already existing, please create new",
            data: {}
        });
        const { user_id } = User.findById(req.user.id);
        let errand = new Errand({ 
            posterID: user_id,
            category,
            pickupLocation,
            deliveryLocation,
            description,
            amount,
            deadlineDate,
            insurance
            });
        let result = await errand.save();
        return formatMongoData(result);
    } catch (error){
        console.log('Something went wrong: Service: errandController', error);
        throw new Error(error);
    }
}

module.exports.getAllErrand = async ({skip = 0, limit = 10 }) => {
    try{
        let errands = await Errand.find({ }).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(errands);
    } catch (error){
        console.log('Something went wrong: Service: productController', error);
        throw new Error(error);
    }
}

module.exports.getErrandById = async ({ id }) => {
    try{
        chkObjectId(id);
        let errand = await Errand.findById(id);
        if(!errand){
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(errand);
    } catch (error){
        console.log('Something went wrong: Service: getProductById', error);
        throw new Error(error);
    }
}

module.exports.updateProductById = async ({ id, updateInfo }) => {
    try{
        chkObjectId(id);
        let product = await Product.findOneAndUpdate(
            {_id: id},
            updateInfo,
            { new: true }
            );
        if(!product){
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(product);
    } catch (error){
        console.log('Something went wrong: Service: updateProductById', error);
        throw new Error(error);
    }
}

module.exports.deleteProductById = async ({ id }) => {
    try{
        chkObjectId(id);
        let product = await Product.findByIdAndDelete(id);
        if(!product){
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(product);
    } catch (error){
        console.log('Something went wrong: Service: deleteProductById', error);
        throw new Error(error);
    }
}