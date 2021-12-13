const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const UserController = require("../controllers/user.controller");

router.get("/", (req, res) => {
	new UserController().getUsers(req, res);
})

router.get("/:id", (req, res) => {
	new UserController().getUser(req, res);
})

module.exports = router;