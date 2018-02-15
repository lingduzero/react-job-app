import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, WhiteSpace, WingBlank } from "antd-mobile";
import { withRouter } from "react-router-dom";

@withRouter
class UserCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  static propTypes = {
    userList: PropTypes.array.isRequired
  };
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`);
  }
  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userList.map(
          v =>
            v.avatar ? (
              <Card key={v._id} onClick={() => this.handleClick(v)}>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                />
                <Body>
                  {v.type === "recuriter" ? (
                    <div>Company: {v.company}</div>
                  ) : null}
                  {v.requirement
                    ? v.requirement.split("\n").map(d => <div key={d}>{d}</div>)
                    : null}
                  {v.type === "recuriter" ? (
                    <div>Salary: {v.salary}</div>
                  ) : null}
                </Body>
              </Card>
            ) : null
        )}
      </WingBlank>
    );
  }
}

export default UserCard;
