const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const {check} = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
	"/register",
	[
		check("name", "Минимальная длина имени 2 символа").isLength({ min: 2 }),
		check("email", "Некорректная почта").isEmail(),
		check("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 })
	]
	, (req, res) => {
	new AuthController().register(req, res);
})

router.post(
	"/login",
	[
		check("email", "Введите почту").normalizeEmail().isEmail(),
		check("password", "Введите пароль").exists()
	],
	(req, res) => {
	new AuthController().login(req, res);
})

router.get("/auth", authMiddleware, (req, res) => {
	new AuthController().auth(req, res);
})

module.exports = router;