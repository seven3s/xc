var mongoose = require('mongoose');
var ExampleSchema = require('../schemas/example');

var Example = mongoose.model('example', ExampleSchema);

module.exports = Example;