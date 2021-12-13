const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
	value: {type: String, required: true, default: "USER"}
})

module.exports = model("Role", schema);