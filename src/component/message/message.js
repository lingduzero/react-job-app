import React from "react";
import { connect } from "react-redux";
import { List } from "antd-mobile";

@connect(state => state)
class Message extends React.Component {
  getLast(array){
    return array[array.length - 1];
  }
  render(){
    const Item = List.Item;
    const Brief = Item.Brief;
    const messageGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      messageGroup[v.chatid] = messageGroup[v.chatid] || [];
      messageGroup[v.chatid].push(v);
    })
    const chatList = Object.values(messageGroup);
    return (
      <div>
        <List>
        {chatList.map(v => {
          console.log(v);
          const lastItem = this.getLast(v);
          console.log(lastItem);
          return(
            <Item key={lastItem._id}><Brief>username</Brief></Item>
          )})}
          </List>
    </div>)
  }
}

export default Message;
