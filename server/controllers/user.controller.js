const User = require("../models/User");

class UserController {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: "Ошибка сервера, попробуйте позже"
            })
        }
    }

    async getUser(req, res) {
        try {
            const findUser = await User.findById(req.params.id);
            res.status(200).json(findUser);
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: "Ошибка сервера, попробуйте позже"
            })
        }
    }
}

module.exports = UserController;