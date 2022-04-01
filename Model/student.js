const mongoose = require('mongoose');

const Student = new mongoose.Schema(
    {
        name: {type:String},
        age: {type:Number},
        mobile: {type:String}
    },
    {
        collection: 'students'
    }
);

const model = mongoose.model("Student",Student);

module.exports = model;

