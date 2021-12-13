const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const {validationResult} = require("express-validator");
const Role = require("../models/Role");

class AuthController {
	async register(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Некорректные данные при регистрации"
				})
			}

			const { name, email, password } = req.body;
			const findUser = await User.findOne({email});

			if (findUser) {
				return res.status(400).json({
					message: "Пользователь с такой почтой уже существует"
				})
			}

			const hashPassword = await bcrypt.hash(password, 8);
			const role = await Role.findOne({value: "USER"});

			const newUser = new User({
				name, email,
				password: hashPassword,
				roles: [role.value]
			})

			newUser.save();

			res.status(201).json({
				message: "Пользователь создан"
			})
		} catch(e) {
			console.log(e);
			res.status(500).json({
				message: "Ошибка сервера, попробуйте позже"
			})
		}
	}

	async login(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Некорректные данные при входе"
				})
			}

			const {email, password} = req.body;
			const findUser = await User.findOne({email});

			if (!findUser) {
				return res.status(400).json({
					message: "Пользователя не существует"
				})
			}

			const comparePassword = await bcrypt.compare(password, findUser.password);

			if (!comparePassword) {
				return res.status(400).json({
					message: "Данные неверны"
				})
			}

			const token = jwt.sign({_id: findUser._id, roles: findUser.roles}, config.get("jwtKey"), {expiresIn: "24h"})
			res.status(200).json({
				token,
				infoUser: {
					name: findUser.name,
					email: findUser.email,
					roles: findUser.roles,
					avatar: findUser.avatar,
					videos: findUser.videos,
					_id: findUser._id
				}
			})
		} catch(e) {
			console.log(e);
			res.status(500).json({
				message: "Ошибка сервера, попробуйте позже"
			})
		}
	}

	async auth(req, res) {
		try {
			const findUser = await User.findById(req.user._id);
			const token = jwt.sign({_id: findUser._id, roles: findUser.roles}, config.get("jwtKey"), {expiresIn: "24h"});

			res.status(200).json({
				token,
				infoUser: {
					name: findUser.name,
					email: findUser.email,
					roles: findUser.roles,
					avatar: findUser.avatar,
					videos: findUser.videos,
					_id: findUser._id
				}
			})
		} catch(e) {
			console.log(e);
			res.status(500).json({
				message: "Ошибка сервера, попробуйте позже"
			})
		}
	}
}

module.exports = AuthController;