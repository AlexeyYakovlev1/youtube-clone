const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}

	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(400).json({
				message: "Нет авторизации"
			})
		}
		const decoded = jwt.verify(token, config.get("jwtKey"));
		req.user = decoded;
		next();
	} catch(e) {
		console.log(e);
		res.status(400).json({
			message: "Нет авторизации"
		})
	}
}