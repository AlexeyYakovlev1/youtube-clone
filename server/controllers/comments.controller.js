const {validationResult} = require("express-validator");
const Comment = require("../models/Comment");

class CommentsController {
    async add(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при добавлении комментария"
                })
            }

            const {text} = req.body;
            
            const newComment = new Comment({
                text, owner: req.user._id,
                createdAt: new Date(), video: req.params.id
            })

            await newComment.save();
            res.status(201).json({
                message: "Комментарий добавлен"
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: "Ошибка сервера"
            })
        }
    }

    async getComments(req, res) {
        try {
            const findComments = await Comment.find({video: req.params.id});
            res.status(200).json({findComments});
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: "Ошибка сервера"
            })
        }
    }
}

module.exports = CommentsController;