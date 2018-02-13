import React, { Component } from "react";
import { connect } from "react-redux";
import { Result, List, WhiteSpace, Modal } from "antd-mobile";
import browserCookies from "browser-cookies";
import { logoutSubmit } from "../../redux/user.redux";

import { Redirect } from "react-router-dom";
@connect(state => state.user, {
  logoutSubmit
})
class User extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const alert = Modal.alert;

    alert("logout", "Are you sure to logout?", [
      { text: "Cancel", onPress: () => console.log("cancel") },
      {
        text: "Ok",
        onPress: () => {
          browserCookies.erase("userid");
          this.props.logoutSubmit();
        }
      }
    ]);

    console.log("logout!");
  }
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../img/${props.avatar}.png`)}
              style={{ width: 50 }}
              alt=""
            />
          }
          title={props.user}
          message={props.type === "recuriter" ? props.company : null}
        />
        <List renderHeader={() => "Introduction"}>
          <Item multipleLine>
            {props.title}
            {props.requirement.split("\n").map(v => <Brief key={v}>{v}</Brief>)}
            {props.salary ? <Brief>salary: {props.salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Item onClick={this.logout}>logout</Item>
        </List>
      </div>
    ) : (
      <Redirect to={props.redirectTo} />
    );
  }
}

export default User;
