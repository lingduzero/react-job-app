import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../component/logo/logo";
import {
  List,
  Radio,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from "antd-mobile";
import { connect } from "react-redux";
import { register } from "../../redux/user.redux";

@connect(state => state.user, { register })
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pwd: "",
      repeatpwd: "",
      type: "recuriter"
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    this.props.register(this.state);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <List>
          <WingBlank />
          {this.props.msg ? (
            <p className="error-msg">{this.props.msg}</p>
          ) : null}
          <InputItem onChange={v => this.handleChange("user", v)}>
            username
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.handleChange("pwd", v)}
          >
            password
          </InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.handleChange("repeatpwd", v)}
          >
            confirm
          </InputItem>
          <WhiteSpace />
          <RadioItem
            checked={this.state.type === "recuriter"}
            onChange={() => this.handleChange("type", "recuriter")}
          >
            recuriter
          </RadioItem>
          <WhiteSpace />
          <RadioItem
            checked={this.state.type === "consultant"}
            onChange={() => this.handleChange("type", "consultant")}
          >
            consultant
          </RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            register
          </Button>
        </List>
      </div>
    );
  }
}

export default Register;
