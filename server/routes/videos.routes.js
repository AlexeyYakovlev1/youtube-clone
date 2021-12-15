const router = require("express").Router();
const VideosController = require("../controllers/videos.controller");
const {check} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware")

router.post(
    "/add",
    authMiddleware,
    [
        check("name", "Минимальная длина заголовка 2 символа").isLength({min: 2}),
        check("url", "Видео не найдно").exists()
    ],
    (req, res) => {
    new VideosController().add(req, res);
})

router.post("/remove/:id", authMiddleware, (req, res) => {
    new VideosController().remove(req, res);
})

router.get("/", (req, res) => {
    new VideosController().getVideos(req, res);
})

router.get("/:id", (req, res) => {
    new VideosController().getVideo(req, res);
})

router.get("/owner/:id", (req, res) => {
    new VideosController().getVideoForPerson(req, res);
})

module.exports = router;