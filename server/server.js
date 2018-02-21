import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import model from "./model";
import csshook from "css-modules-require-hook/preset";
import assethook from "asset-require-hook";
assethook({
  extensions:['png']
})
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "../src/app";
import reducers from "../src/reducer";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import staticPath from "../build/asset-manifest.json";


const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const Chat = model.getModel("chat");

io.on("connection", function(socket) {
  socket.on("sendmsg", function(data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join("_");
    Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
      io.emit("receivemsg", Object.assign({}, doc._doc));
    });
  });
});
const userRouter = require("./user");

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use(function(req, res, next) {
  if (req.url.startsWith("/user/") || req.url.startsWith("/static/")) {
    return next();
  }
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk)
    )
  );
  let context = {};
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  
  const pageHtml = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">

      <title>React App</title>
      <link rel="stylesheet" href="/${staticPath['main.css']}">
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${markup}</div>
      <script src="/${staticPath['main.js']}"></script>
    </body>
  </html>`;
  res.end(pageHtml);
  //return res.sendFile(path.resolve("build/index.html"));
});
app.use("/", express.static(path.resolve("build")));
server.listen(9093, function() {
  console.log("Node app start at 9093");
});
