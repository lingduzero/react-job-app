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
import appForm from "../../component/app-form/app-form";

@connect(state => state.user, { register })
@appForm
class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount() {
    this.props.handleChange("type", "recuriter");
  }
  handleRegister() {
    this.props.register(this.props.state);
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
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.props.handleChange("repeatpwd", v)}
          >
            confirm
          </InputItem>
          <WhiteSpace />
          <RadioItem
            checked={this.props.state.type === "recuriter"}
            onChange={() => this.props.handleChange("type", "recuriter")}
          >
            recuriter
          </RadioItem>
          <WhiteSpace />
          <RadioItem
            checked={this.props.state.type === "consultant"}
            onChange={() => this.props.handleChange("type", "consultant")}
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
