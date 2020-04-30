const categoryService = require('../service/categoryService');
const constants = require('../constants');

module.exports.createCategory = async (req,res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await categoryService.createCategory(req.body);
        response.status = 200;
        response.message = constants.categoryMessage.CATEGORY_CREATED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: createCategory', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}


module.exports.getCategoryById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await categoryService.getCategoryById(req.params);
        response.status = 200;
        response.message = constants.categoryMessage.CATEGORY_FETCHED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: getCategoryById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}


module.exports.getAllCategory = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await categoryService.getAllCategory(req.query);
        response.status = 200;
        response.message = constants.categoryMessage.CATEGORY_FETCHED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: getAllCategory', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateCategoryById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await categoryService.updateCategoryById({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.categoryMessage.CATEGORY_UPDATED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: updateCategoryById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.deleteCategoryById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await categoryService.deleteCategoryById(req.params);
        response.status = 200;
        response.message = constants.categoryMessage.CATEGORY_DELETED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: deleteCategoryById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}