const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (requireRoles) => {
	return async function(req, res, next) {
		if (req.method === "OPTIONS") {
			return next()
		}

		try {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				return res.status(400).json({
					message: "Нет авторизации"
				})
			}
			const {roles} = jwt.verify(token, config.get("jwtKey"));
			
			roles.forEach(role => {
				if (!requireRoles.includes(role)) {
					return res.status(400).json({
						message: "Нет доступа"
					})
				}
			})

			next();
		} catch(e) {
			console.log(e);
			res.status(400).json({
				message: "Нет доступа"
			})
		}
	}
}