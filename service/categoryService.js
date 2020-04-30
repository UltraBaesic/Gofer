const Category = require('../database/models/categoryModel');
const {formatMongoData, chkObjectId} = require('../helper/dbHelper');
const constants = require('../constants/');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

module.exports.createCategory = async (data) => {
    try{
        let category = new Category({ ...data })
        let result = await category.save();
        return formatMongoData(result);
    } catch (error){
        console.log('Something went wrong: Service: categoryController', error);
        throw new Error(error);
    }
}

module.exports.getAllCategory = async () => {
    try{
        let categories = await Category.find({ });
        return formatMongoData(categories);
    } catch (error){
        console.log('Something went wrong: Service: categoryController', error);
        throw new Error(error);
    }
}

module.exports.getCategoryById = async ({ id }) => {
    try{
        chkObjectId(id);
        let category = await Category.findById(id);
        if(!category){
            throw new Error(constants.categoryMessage.CATEGORY_NOT_FOUND);
        }
        return formatMongoData(category);
    } catch (error){
        console.log('Something went wrong: Service: getCategoryById', error);
        throw new Error(error);
    }
}

module.exports.updateCategoryById = async ({ id, updateInfo }) => {
    try{
        chkObjectId(id);
        let category = await Category.findOneAndUpdate(
            {_id: id},
            updateInfo,
            { new: true }
            );
        if(!category){
            throw new Error(constants.categoryMessage.CATEGORY_NOT_FOUND);
        }
        return formatMongoData(category);
    } catch (error){
        console.log('Something went wrong: Service: updateCategoryById', error);
        throw new Error(error);
    }
}

module.exports.deleteCategoryById = async ({ id }) => {
    try{
        chkObjectId(id);
        let category = await Category.findByIdAndDelete(id);
        if(!category){
            throw new Error(constants.categoryMessage.CATEGORY_NOT_FOUND);
        }
        return formatMongoData(category);
    } catch (error){
        console.log('Something went wrong: Service: deleteCategoryById', error);
        throw new Error(error);
    }
}