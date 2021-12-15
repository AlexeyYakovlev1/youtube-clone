const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	url: {type: String, required: true, unique: true},
	owner: {type: Types.ObjectId, ref: "User"},
	createdAt: {type: Date, default: Date.now},
	watches: {type: Number, default: 0}
})

module.exports = model("Video", schema);