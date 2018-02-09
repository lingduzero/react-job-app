import React, { Component } from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelector from "../../component/avatar-selector/avatar-selector";
import { connect } from "react-redux";
import { update } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";

@connect(state => state.user, { update })
class RecuriterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      salary: "",
      requirement: ""
    };
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={redirect} /> : null}
        <NavBar mode="dark">Recuriter Info</NavBar>
        <AvatarSelector
          selectAvatar={imgname => {
            this.setState({
              avatar: imgname
            });
          }}
        />
        <InputItem onChange={v => this.onChange("title", v)}>
          position
        </InputItem>
        <InputItem onChange={v => this.onChange("company", v)}>
          company
        </InputItem>
        <InputItem onChange={v => this.onChange("salary", v)}>salary</InputItem>
        <TextareaItem
          onChange={v => this.onChange("requirement", v)}
          rows={3}
          autoHeight
          title="requirement"
        />
        <Button
          onClick={() => {
            this.props.update(this.state);
          }}
          type="primary"
        >
          SAVE
        </Button>
      </div>
    );
  }
}

export default RecuriterInfo;
