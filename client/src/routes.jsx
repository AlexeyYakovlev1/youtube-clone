import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import User from "./pages/User";
import Video from "./pages/Video";

const Routes = (isAuth) => {
	if (!isAuth) {
		return (
			<Switch>
				<Route exact path="/auth" component={Auth} />
				<Redirect to="/auth" />
			</Switch>
		)
	}

	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/user/:id" component={User} />
			<Route path="/watch/:id" component={Video} />
			<Redirect to="/" />
		</Switch>
	)
}

Routes.propTypes = {
	isAuth: propTypes.bool.isRequired
}

export default Routes;