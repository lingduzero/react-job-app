import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from "../usercard/usercard";
@connect(state => state.chatuser, { getUserList })
class Recuriter extends Component {
  componentDidMount() {
    this.props.getUserList("consultant");
  }

  render() {
    return <UserCard userList={this.props.userList} />;
  }
}

export default Recuriter;
