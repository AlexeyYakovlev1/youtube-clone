const Video = require("../models/Video");
const {validationResult} = require("express-validator");

class VideosController {
    async add(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при публикации видео"
                })
            }

            const {name, description, url} = req.body;
            const newVideo = new Video({
                name, description, url,
                owner: req.user._id, createdAt: new Date()
            })

            await newVideo.save();
            res.status(201).json({
                message: "Видео опубликовано"
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: e.message
            })
        }
    }

    async remove(req, res) {
        try {
            const findVideo = await Video.findById(req.params.id);
            await Video.deleteOne({
                _id: findVideo._id
            })
            res.status(200).json({
                message: "Видео удалено"
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: e.message
            })
        }
    }

    async getVideos(req, res) {
        try {
            const findVideos = await Video.find();
            res.status(200).json({findVideos})
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: e.message
            })
        }
    }

    async getVideo(req, res) {
        try {
            const findVideo = await Video.findById(req.params.id);
            findVideo.watches++;
            await findVideo.save();
            res.status(200).json({findVideo})
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: e.message
            })
        }
    }

    async getVideoForPerson(req, res) {
        try {
            const findVideo = await Video.find({owner: req.params.id});
            res.status(200).json({findVideo})
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: e.message
            })
        }
    }
}

module.exports = VideosController;