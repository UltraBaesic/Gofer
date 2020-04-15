const errandService = require('../service/errandService');
const constants = require('../constants');

module.exports.createErrand = async (req,res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await errandService.createErrand(req.body);
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_CREATED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: createErrand', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}


module.exports.getErrandById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await errandService.getErrandById(req.params);
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_FETCHED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: getErrandById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}


module.exports.getAllErrand = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await errandService.getAllErrand(req.query);
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_FETCHED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: getAllErrand', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateProductById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await productService.updateProductById({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_FETCHED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: updateProductById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.deleteProductById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await productService.deleteProductById(req.params);
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_DELETED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: deleteProductById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}