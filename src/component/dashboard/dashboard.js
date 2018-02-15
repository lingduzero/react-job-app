import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import { Switch, Route } from "react-router-dom";
import NavLinkBar from "../navlink/navlink";
import Recuriter from "../recuriter/recuriter";
import Consultant from "../consultant/consultant";
import Message from "../message/message";
import User from "../user/user";
import { getMsgList, receiveMsg } from "../../redux/chat.redux";

@connect(state => state, { getMsgList, receiveMsg })
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.receiveMsg();
    }
  }
  render() {
    const { pathname } = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path: "/recuriter",
        text: "consultant",
        icon: "recuriter",
        title: "consultant list",
        component: Recuriter,
        hide: user.type === "consultant"
      },
      {
        path: "/consultant",
        text: "recuriter",
        icon: "job",
        title: "recuriter list",
        component: Consultant,
        hide: user.type === "recuriter"
      },
      {
        path: "/msg",
        text: "message",
        icon: "msg",
        title: "messsage list",
        component: Message
      },
      {
        path: "/me",
        text: "me",
        icon: "user",
        title: "personal center",
        component: User
      }
    ];
    return (
      <div>
        <NavBar className="fixd-header" mode="dark">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}

export default Dashboard;
