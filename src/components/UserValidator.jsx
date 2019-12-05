import React, { Component } from "react";
import firebase from "../firebase";
import Waiting from "../views/Waiting";

class UserValidator extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("App");
      } else {
        navigation.navigate("Auth");
      }
    });
  }

  render() {
    return <Waiting />;
  }
}

export default UserValidator;
