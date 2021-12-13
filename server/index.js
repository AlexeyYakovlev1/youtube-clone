const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = config.get("port") || 5000;
const URL = config.get("mongoUrl");

app.use(express.json({extended: true}));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));

const start = async() => {
	try {
		await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		app.listen(PORT, () => {
			console.log(`server has been started on port ${PORT}`);
		})
	} catch(e) {
		console.log(e);
	}
}

start();