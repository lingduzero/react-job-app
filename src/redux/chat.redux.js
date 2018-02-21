import axios from "axios";
import io from "socket.io-client";
const socket = io("ws://localhost:9093");

const MSG_LIST = "MSG_LIST";
const MSG_RECEIVE = "MSG_RECEIVE";
const MSG_READ = "MSG_READ";

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
};

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(
          v => !v.read && v.to === action.payload.userid
        ).length
      };
    case MSG_RECEIVE:
      const n = action.payload.to === action.userid ? 1 : 0;
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload],
        unread: state.unread + n
      };
    case MSG_READ:
      const { from, num } = action.payload;
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({
          ...v,
          read: from === v.from ? true : v.read
        })),
        unread: state.unread - num
      };
    default:
      return state;
  }
}

function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } };
}
function msgReceive(msg, userid) {
  return { userid, type: MSG_RECEIVE, payload: msg };
}

function msgRead({ from, userid, num }) {
  return { type: MSG_READ, payload: { from, userid, num } };
}

export function readMsg(from) {
  return async (dispatch, getState) => {
    const res = await axios.post("/user/readmsg", { from });
    const userid = getState().user._id;

    if (res.status === 200 && res.data.code === 0) {
      dispatch(msgRead({ userid, from, num: res.data.num }));
    }
  };
}
export function receiveMsg() {
  return (dispatch, getState) => {
    socket.on("receivemsg", function(data) {
      const userid = getState().user._id;
      dispatch(msgReceive(data, userid));
    });
  };
}
export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit("sendmsg", { from, to, msg });
  };
}
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get("/user/getmsglist").then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id;
        dispatch(msgList(res.data.msgs, res.data.users, userid));
      }
    });
  };
}
