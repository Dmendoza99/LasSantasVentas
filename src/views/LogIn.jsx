import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, Icon, Button, Text } from "react-native-elements";
import { Auth } from "../firebase";
import CenteredView from "../components/CenteredView";

const styles = StyleSheet.create({
  OuterStyle: { backgroundColor: "#FFC107" },
  InnerStyle: { width: "75%", marginLeft: "12.5%" },
  ButtonStyle: { marginTop: 5 },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
    textDecorationLine: "underline",
  },
});
class LogIn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  render() {
    const { OuterStyle, InnerStyle, ButtonStyle, textStyle } = styles;
    const { email, password } = this.state;
    const handleInput = name => {
      return text => {
        this.setState({ [name]: text });
      };
    };
    const handleLogin = () => {
      Auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        })
        .catch(error => {
          console.error(error);
        });
    };

    return (
      <CenteredView OuterStyle={OuterStyle} InnerStyle={InnerStyle}>
        <Input
          placeholder="Email"
          label="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          leftIconContainerStyle={{ marginRight: 5 }}
          containerStyle={{ backgroundColor: "white", borderRadius: 5 }}
          leftIcon={<Icon name="email" type="material-community" size={24} color="gray" />}
          value={email}
          onChangeText={handleInput("email")}
        />
        <Input
          secureTextEntry
          placeholder="contraseña"
          label="contraseña"
          autoCompleteType="password"
          leftIconContainerStyle={{ marginRight: 5 }}
          containerStyle={{ backgroundColor: "white", borderRadius: 5 }}
          leftIcon={<Icon name="key" type="material-community" size={24} color="gray" />}
          value={password}
          onChangeText={handleInput("password")}
        />
        <Button title="Iniciar Sesion" onPress={handleLogin} containerStyle={ButtonStyle} />
        <TouchableOpacity
          onPress={() => {
            console.log("wenas");
          }}>
          <Text style={textStyle}>No tengo cuenta</Text>
        </TouchableOpacity>
      </CenteredView>
    );
  }
}

export default LogIn;
