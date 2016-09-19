var mongoose = require('mongoose');
var ExampleScheMa = new mongoose.Schema({
    aaa: String,
    bbb: Number,
    ccc: String,
    ddd: String,
    eee: Number,
    fff: Object,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }

    }
});

ExampleScheMa.pre('save', function (next) {

    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.updateAt = Date.now();
    }

    next();
});

ExampleScheMa.statics = {
    fetch: function(cb){
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb){
        return this.findOne({_id: id}).exec(cb);
    }
};
module.exports = ExampleScheMa;