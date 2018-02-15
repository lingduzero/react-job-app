import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Login from "./container/login/login";
import Register from "./container/register/register";
import RecuriterInfo from "./container/recuriterinfo/recuriterinfo";
import ConsultantInfo from "./container/consultantinfo/consultantinfo";
import AuthRoute from "./component/authroute/authroute";
import Dashboard from "./component/dashboard/dashboard";
import Chat from "./component/chat/chat";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reducers from "./reducer";
import "./config";
import "./index.css";
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/recuriterinfo" component={RecuriterInfo} />
          <Route path="/consultantinfo" component={ConsultantInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
