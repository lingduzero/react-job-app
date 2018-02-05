import React, { Component } from "react";
import { connect } from "react-redux";
import { addWeapon, reduceWeapon, addWeaponAsync } from "./index.redux";

// const mapStatetoProps = state => {
//   return { num: state };
// };
//
// const actionCreators = { addWeapon, reduceWeapon, addWeaponAsync };
//App = connect(mapStatetoProps, actionCreators)(App);
@connect(
  state => ({
    num: state
  }),
  { addWeapon, reduceWeapon, addWeaponAsync }
)
class App extends Component {
  render() {
    return (
      <div>
        <h1>now weapons {this.props.num}</h1>
        <button onClick={this.props.addWeapon}>add weapons</button>
        <button onClick={this.props.reduceWeapon}>reduce weapons</button>
        <button onClick={this.props.addWeaponAsync}>add weapons late</button>
      </div>
    );
  }
}

export default App;
