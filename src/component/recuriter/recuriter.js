import React, { Component } from "react";
import axios from "axios";
import { Card, WhiteSpace, WingBlank } from "antd-mobile";
class Recuriter extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    axios.get("/user/list?type=recuriter").then(res => {
      if (res.data.code === 0) {
        this.setState({ data: res.data.data });
      }
    });
  }

  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    console.log(this.state);
    return (
      <div>
        <WingBlank>
          <WhiteSpace />
          {this.state.data.map(
            v =>
              v.avatar ? (
                <Card key={v._id}>
                  <Header
                    title={v.user}
                    thumb={require(`../img/${v.avatar}.png`)}
                    extra={<span>{v.company}</span>}
                  />
                  <Body>
                    {v.requirement
                      ? v.requirement
                          .split("\n")
                          .map(d => <div key={d}>{d}</div>)
                      : null}
                  </Body>
                </Card>
              ) : null
          )}
        </WingBlank>
      </div>
    );
  }
}

export default Recuriter;
