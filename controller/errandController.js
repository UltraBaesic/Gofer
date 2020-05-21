const errandService = require('../service/errandService');
const constants = require('../constants');

module.exports.createErrand = async (req,res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await errandService.createErrand(req.userId, req.body);
        response.status = 200;
        response.message = constants.errandMessage.ERRAND_CREATED;
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
        const responseFromService = await errandService.getErrandById(req.params.id, req.userId);
        response.status = 200;
        response.message = constants.errandMessage.ERRAND_FETCHED;
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
        response.message = constants.errandMessage.ERRAND_FETCHED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: getAllErrand', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateErrandById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await errandService.updateErrandById(req.params.id, req.userId, req.body);
        response.status = 200;
        response.message = constants.errandMessage.ERRAND_UPDATED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: updateErrandById', err);
        throw Error ('err');
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.deleteErrandById = async (req, res) => {
    let response = {...constants.defaultServerResponse};
    try{
        const responseFromService = await errandService.deleteErrandById(req.params.id, req.userId);
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_DELETED;
        response.body = responseFromService;
    } catch (err){
        console.log('Something went wrong: Controller: deleteErrandById', err);
        throw Error (err);
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.postBid = async (req,res) => {
  let response = {...constants.defaultServerResponse};
  try{
      const responseFromService = await errandService.postBid(req.params.id, req.body);
      response.status = 200;
      response.message = constants.errandMessage.BID_SUBMITTED;
      response.body = responseFromService;
  } catch (err){
      console.log('Something went wrong: Controller: postBid', err);
      throw Error (err);
      response.message = err.message;
  }
  return res.status(response.status).send(response);
}

module.exports.getBid = async (req,res) => {
  let response = {...constants.defaultServerResponse};
  try{
      const responseFromService = await errandService.getBids(req.params.id);
      response.status = 200;
      response.message = constants.errandMessage.BIDS_FETCHED;
      response.body = responseFromService;
  } catch (err){
      console.log('Something went wrong: Controller: getBid', err);
      throw Error (err);
      response.message = err.message;
  }
  return res.status(response.status).send(response);
}

module.exports.deleteBid = async (req,res) => {
  let response = {...constants.defaultServerResponse};
  try{
      const responseFromService = await errandService.deleteBids(req.params.id);
      response.status = 200;
      response.message = constants.errandMessage.BID_DELETED;
      response.body = responseFromService;
  } catch (err){
      console.log('Something went wrong: Controller: deleteBid', err);
      throw Error (err);
      response.message = err.message;
  }
  return res.status(response.status).send(response);
}