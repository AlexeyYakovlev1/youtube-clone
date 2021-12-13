import React from "react";
import { Container } from '@mui/material';
import Routes from "./routes.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./actions/AuthAction.js";

const App = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const routes = Routes(isAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(auth());
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      {isAuth && <Header />}
      <Container maxWidth="lg">
        {routes}
      </Container>
    </Router>
  );
}

export default App;
