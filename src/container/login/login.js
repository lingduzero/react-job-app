import React, { Component } from "react";
import Logo from "../../component/logo/logo";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import { login } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
import appForm from "../../component/app-form/app-form";

@connect(state => state.user, { login })
@appForm
class Login extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  register() {
    this.props.history.push("/register");
  }
  handleLogin() {
    this.props.login(this.props.state);
  }
  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== "login" ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.props.handleChange("user", v)}>
              username
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.props.handleChange("pwd", v)}
            >
              password
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>
            Login
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            Register
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
