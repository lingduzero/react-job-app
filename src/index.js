import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import App from "./App";
import { counter } from "./index.redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { BrowserRouter, Route, Link } from "react-router-dom";

const reduxDevtools = window.devToolsExtension
  ? window.devToolsExtension()
  : () => {};
const store = createStore(
  counter,
  compose(applyMiddleware(thunk), reduxDevtools)
);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
