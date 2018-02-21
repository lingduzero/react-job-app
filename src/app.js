import React from "react";
import Login from "./container/login/login";
import Register from "./container/register/register";
import RecuriterInfo from "./container/recuriterinfo/recuriterinfo";
import ConsultantInfo from "./container/consultantinfo/consultantinfo";
import AuthRoute from "./component/authroute/authroute";
import Dashboard from "./component/dashboard/dashboard";
import Chat from "./component/chat/chat";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hasError:false
    }
  }
  
  componentDidCatch(error, info){
    this.setState({
      hasError: true
    })
  }
  render() {
    return this.state.hasError? <img src={require("./error.png")} alt="error" />: (
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
    );
  }
}

export default App;
