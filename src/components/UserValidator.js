import React, { Component } from "react";
import { Auth, Users } from "../firebase";
import Waiting from "../views/Waiting";

class UserValidator extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    Auth.onAuthStateChanged(user => {
      if (user) {
        Users.doc(user.uid)
          .get()
          .then(value => value.data())
          .then(userInfo => {
            const { allowed } = userInfo;
            if (allowed) {
              navigation.navigate("CommonApp");
            } else {
              Auth.signOut();
              navigation.navigate("Auth");
            }
          });
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
