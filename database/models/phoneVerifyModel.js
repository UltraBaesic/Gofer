const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  request_id: {
    type: String, 
    required: true,
  },
  phoneNumber: {
    type: String, 
    required: true,
  }
},{
    timestamps: true,
    toObject: {
        transform: function(doc, ret, options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Request', requestSchema);