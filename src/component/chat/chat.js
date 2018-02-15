import React from "react";
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile";
import { connect } from "react-redux";
import { getMsgList, sendMsg, receiveMsg } from "../../redux/chat.redux";
import { getChatId } from "../../util";
//import io from "socket.io-client";
// const socket = io("ws://localhost:9093");

@connect(state => state, { getMsgList, sendMsg, receiveMsg })
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", msg: [], showEmoji: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.receiveMsg();
    }
    this.fixCarousel();
  }

  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }

  handleSubmit() {
    //socket.emit("sendmsg", { text: this.state.text });
    //this.setState({ text: "" });
    console.log("click");
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    //console.log({ from, to, msg });
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: "" });
  }
  render() {
    const emoji = "😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 "
      .split(" ")
      .filter(v => v)
      .map(v => ({ text: v }));
    const userid = this.props.match.params.user;
    const Item = List.Item;
    const users = this.props.chat.users;
    if (!users[userid]) {
      return null;
    }
    const chatid = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          {users[userid].name}
        </NavBar>

        {chatmsgs.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`);
          return v.from === userid ? (
            <List key={v._id}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item extra={<img src={avatar} alt="" />} className="chat-me">
                {v.content}
              </Item>
            </List>
          );
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="please enter"
              value={this.state.text}
              onChange={v => {
                this.setState({ text: v });
              }}
              extra={
                <div>
                  <span
                    role="img"
                    aria-label="Smile"
                    style={{ marginRight: 15 }}
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      });
                      this.fixCarousel();
                    }}
                  >
                    😀
                  </span>
                  <span onClick={this.handleSubmit}>Send</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouseMaxRow={6}
              isCarousel={true}
              onClick={el => {
                console.log(el);
                this.setState({ text: this.state.text + el.text });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Chat;
