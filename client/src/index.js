import React from 'react';
import "./styles/style.css";
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from "redux";
import allReducers from "./redux/reducers/index";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk"

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
