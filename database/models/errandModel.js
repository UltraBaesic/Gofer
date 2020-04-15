const mongoose = require('mongoose');

const errandSchema = new mongoose.Schema({
    posterID: Joi.string(),
    category: Joi.string(),
    pickupLocation: Joi.string(),
    deliveryLocation: Joi.string(),
    description: {
        type: String,
        required: true,
        unique: true
    },
    amount: Joi.string(),
    deadlineDate: {
        type: Date,
        default: Date.now,
    },
    insurance: Joi.string(),
    status: {
        type: String,
        default: "pending",
    }
},{
    timestamps: true,
    toObject: {
        transform: function(doc, ret, options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Errand', errandSchema);