const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	avatar: {type: String, required: true, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04IQPD-wCoIQ3vpWQy5mjc1HTVrCP1ZvJyg&usqp=CAU"},
	videos: [{type: Types.ObjectId, ref: "Video"}],
	roles: [{type: String, ref: "Role"}]
})

module.exports = model("User", schema);