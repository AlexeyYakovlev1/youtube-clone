const {model, Schema, Types} = require("mongoose");

const schema = new Schema({
    text: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: "User"},
    createdAt: {type: Date, default: Date.now},
    video: {type: Types.ObjectId, ref: "Video"}
})

module.exports = model("Comment", schema);