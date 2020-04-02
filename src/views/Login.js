import React, { PureComponent } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Input, Icon, Button, Text, Avatar } from "react-native-elements";
import { Auth } from "../firebase";
import { theme } from "../Constants";
import icon from "../../assets/icon.png";

const styles = StyleSheet.create({
  OuterStyle: { backgroundColor: theme.colors.secondary, flex: 1, justifyContent: "center" },
  InnerStyle: {
    width: "75%",
    marginLeft: "12.5%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonStyle: { marginTop: 5 },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
    textDecorationLine: "underline",
  },
});
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleInput = name => {
    return text => {
      this.setState({ [name]: text });
    };
  };

  handleLogin = () => {
    const { email, password } = this.state;
    Auth.signInWithEmailAndPassword(email, password).catch(error => {
      let alert;
      switch (error.code) {
        case "auth/invalid-email":
          alert = "Correo invalido";
          break;
        case "auth/wrong-password":
          alert = "Contraseña incorrecta";
          break;
        default:
          alert = "Hubo un error";
          break;
      }
      ToastAndroid.show(alert, ToastAndroid.SHORT);
    });
  };

  render() {
    const { OuterStyle, InnerStyle, ButtonStyle, textStyle } = styles;
    const { email, password } = this.state;
    const { navigation } = this.props;

    return (
      <View style={OuterStyle}>
        <KeyboardAvoidingView behavior="height" style={InnerStyle}>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Avatar
              source={icon}
              overlayContainerStyle={{ backgroundColor: "#00000000" }}
              size="xlarge"
            />
          </View>
          <Input
            placeholder="Email"
            label="Email"
            autoCompleteType="email"
            keyboardType="email-address"
            leftIconContainerStyle={{ marginRight: 5 }}
            containerStyle={{ backgroundColor: "white", borderRadius: 5, marginBottom: 5 }}
            leftIcon={<Icon name="email" type="material-community" size={24} color="gray" />}
            value={email}
            onChangeText={this.handleInput("email")}
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
            onChangeText={this.handleInput("password")}
          />
          <Button title="Iniciar Sesion" onPress={this.handleLogin} containerStyle={ButtonStyle} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}>
            <Text style={textStyle}>No tengo cuenta</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Login;
