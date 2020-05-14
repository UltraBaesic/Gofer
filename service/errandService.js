const Errand = require('../database/models/errandModel');
const Category = require('../database/models/categoryModel');
const {formatMongoData, chkObjectId} = require('../helper/dbHelper');
const constants = require('../constants');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const {User} = require('../database/models/userModel');
// const tokenValidation = require('../middleware/tokenValidation');

mongoose.set('useFindAndModify', false);

module.exports.createErrand = async (userId, serivceData) => {
    try{
        let dupErrand  = await Errand.findOne({ $and: [{ categoryId }, { description }, { address }, { location }] });
        if (dupErrand) return res.send({
            code: 400,
            message: "Errand already existing, please create new",
            data: {}
        });
        chkObjectId(userId);
        let errand = new Errand({...serivceData, userId});
        let result = await errand.save();
        return formatMongoData(result);
    } catch (error){
        console.log('Something went wrong: Service: errandController', error);
        throw new Error(error);
    }
}

module.exports.getAllErrand = async (req, res) => {
    let aggregate_options = [];

    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 10;

    const options = {
        page, limit,
        collation: {locale: 'en'},
        customLabels: {
            totalDocs: 'totalResults',
            docs: 'errands'
        }
    };

    let match = {};

    //filtering by location
    if (req.query.location) match.location = {$regex: req.query.location, $options: 'i'};

    aggregate_options.push({$match: match});
    //filtering by category
    aggregate_options.push({
      $lookup: {
          from: 'Category',
          localField: "categoryId",
          foreignField: "_id",
          as: "Category"
      }
    });
    aggregate_options.push({$unwind: {path: "$Category", preserveNullAndEmptyArrays: true}});

    //FILTER BY USERID -- SECOND STAGE - use mongoose.Types.ObjectId() to recreate the moogoses object id
    if (req.query.userId) {
        aggregate_options.push({
            $match: {
                userId: mongoose.Types.ObjectId(req.query.userId)
            }
        });
    }

    //FILTER BY CATEGORY
    if (req.query.category) {
      aggregate_options.push({
          $match: {
              categoryId: mongoose.Types.ObjectId(req.query.categoryId)
          }
      });
    }
    aggregate_options.push({
      $project: {
          _id: 1,
          userId: 1,
          amount: 1,
          location: 1,
          address: 1,
          deadlineDate: 1,
          deadlineTime: 1,
          description: 1,
          category: { $ifNull: [ "$Category._id", null ] },
          // categoryName: { $ifNull: [ "$category.categoryName", null ] }
      }
    });

    try{
        const myAggregate = Errand.aggregate(aggregate_options);
        const result = await Errand.aggregatePaginate(myAggregate, options);

        const category = await Category.find({});
        result["category"] = category;
        res.status(200).json(result);
        return formatMongoData(result);
    } catch (error){
        console.log('Something went wrong: Service: errandController', error);
        throw new Error(error);
    }
}

module.exports.getErrandById = async ({ id, user }) => {
    try{
        chkObjectId(id);
        chkObjectId(user);
        let errand = await Errand.findById({_id: id, user_id: user});
        if(!errand){
            throw new Error(constants.errandMessage.ERRAND_NOT_FOUND);
        }
        return formatMongoData(errand);
    } catch (error){
        console.log('Something went wrong: Service: getErrandById', error);
        throw new Error(error);
    }
}

module.exports.updateErrandById = async ({id, userId, update}) => {
    try{
        chkObjectId(id);
        chkObjectId(userId);

        const errand = await Errand.findOneAndUpdate({ $and:[{_id: id}, {userId: userId}], $set: update}, {new: true});

        if (!errand) {
            throw new Error(constants.errandMessage.ERRAND_NOT_FOUND);
        }
        
        return formatMongoData(errand);
    } catch (error){
        console.log('Something went wrong: Service: updateErrandById', error);
        throw new Error(error);
    }
}

module.exports.deleteErrandById = async ({ id, userID }) => {
    try{
        chkObjectId(id);
        chkObjectId(userID);
        let errand = await Errand.findByIdAndDelete({ $and:[{_id:id}, {userId: userID}]});
        if(!errand){
            throw new Error(constants.errandMessage.ERRAND_NOT_FOUND);
        }
        res.status(200).json({message: 'Errand has been deleted'});
    } catch (error){
        console.log('Something went wrong: Service: deleteErrandById', error);
        throw new Error(error);
    }
}