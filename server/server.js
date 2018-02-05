const express = require("express");
const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/techrecuriter";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function() {
  console.log("mongo connect success");
});
const app = express();

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true }
  })
);
//
// User.create(
//   {
//     user: "bingbing",
//     age: "28"
//   },
//   function(err, doc) {
//     if (!err) {
//       console.log(doc);
//     } else {
//       console.log(err);
//     }
//   }
// );
// app.remove({ age: 18 }, function(err, doc) {
//   if (!err) {
//     console.log("delete success!");
//     User.find({}, function(err, doc) {
//       console.log(doc);
//     });
//   }
//
//   console.log(doc);
// });
app.get("/", function(req, res) {
  res.send("<h1> Hello World</h1>");
});

app.get("/data", function(req, res) {
  User.find({}, function(err, doc) {
    res.json(doc);
  });
});

app.get("/delete", function(req, res) {});
app.listen(9093, function() {
  console.log("Node app start at 9093");
});
