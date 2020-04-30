const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
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


categorySchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Category', categorySchema);