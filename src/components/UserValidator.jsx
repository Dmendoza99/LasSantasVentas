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
            const { categorie } = userInfo;
            if (categorie === 0) {
              navigation.navigate("CommonApp");
            } else if (categorie === 1) {
              navigation.navigate("ChefApp");
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
