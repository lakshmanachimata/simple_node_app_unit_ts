var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: { type: String, required: true},
	age: { type: String, required: true}
});

module.exports = mongoose.model("User", UserSchema);