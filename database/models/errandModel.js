const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const errandSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: String,
        required: true
    },
    deadlineDate: {
        type: String
    },
    deadlineTime: {
        type: String
    },
    insurance: String,
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

errandSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Errand', errandSchema);