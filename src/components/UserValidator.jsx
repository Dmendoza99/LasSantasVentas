import React, { Component } from "react";
import { Alert } from "react-native";
import firebase from "../firebase";
import Waiting from "../views/Waiting";

class UserValidator extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified === true) {
          firebase
            .firestore()
            .collection("clients")
            .doc(user.uid)
            .get()
            .then(snap => {
              if (snap.exists) {
                navigation.navigate("App");
              } else {
                Alert.alert(
                  "Usuario no encontrado",
                  "No hemos encontrado este usuario en el sistema. Por favor intenta de nuevo.",
                  [
                    {
                      text: "Ok",
                    },
                  ]
                );
                firebase.auth().signOut();
                navigation.navigate("Auth");
              }
            });
        } else {
          firebase.auth().currentUser.sendEmailVerification();
          navigation.navigate("App");
        }
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
