import React, { Component } from "react";
import { Grid, List } from "antd-mobile";
import PropTypes from "prop-types";
class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const avatarList = "boy1,boy2,boy3,boy4,boy5,boy6,boy7,boy8,cartoon,gentleman,girl1,girl2,girl3,girl4,lady"
      .split(",")
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }));
    const gridHeader = this.state.icon ? (
      <div>
        <span>the avatar</span>
        <img style={{ width: 20 }} src={this.state.icon} alt="" />
      </div>
    ) : (
      "please select avatar"
    );
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={elm => {
              this.setState(elm);
              this.props.selectAvatar(elm.text);
            }}
          />
        </List>
      </div>
    );
  }
}

export default AvatarSelector;
