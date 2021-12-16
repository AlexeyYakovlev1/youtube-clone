const router = require("express").Router();
const CommentsController = require("../controllers/comments.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {check} = require("express-validator");

router.post(
    "/add/:id",
    [
        check("text", "Длина комментария минимум 2 символа").isLength({min: 2})
    ],
    authMiddleware, 
    (req, res) => {
    new CommentsController().add(req, res);
})

router.get("/video/:id", (req, res) => {
    new CommentsController().getComments(req, res);
})

module.exports = router;