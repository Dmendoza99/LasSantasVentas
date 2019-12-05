import React, { PureComponent } from "react";
import { StyleSheet, Text } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { TextInputMask } from "react-native-masked-text";
import CenteredView from "../components/CenteredView";
import { theme } from "../Constants";

const styles = StyleSheet.create({
  OuterStyle: { backgroundColor: theme.colors.secondary },
  InnerStyle: { width: "75%", marginLeft: "12.5%" },
  ButtonStyle: { marginTop: 5 },
  InputStyle: { backgroundColor: "white", borderRadius: 5 },
  IconStyle: { marginRight: 5 },
  TextStyle: { color: "white", fontWeight: "bold", fontSize: 24 },
});

class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", name: "", id: "" };
  }

  render() {
    const { email, password, name, id } = this.state;
    const { OuterStyle, InnerStyle, ButtonStyle, InputStyle, IconStyle, TextStyle } = styles;
    const handleInput = nombre => {
      return text => {
        this.setState({ [nombre]: text });
      };
    };

    return (
      <CenteredView OuterStyle={OuterStyle} InnerStyle={InnerStyle}>
        <Text style={TextStyle}>
          Por favor llenar estos datos, para que sepamos que esta pasando.
        </Text>
        <Input
          placeholder="Nombre"
          label="Nombre"
          autoCompleteType="name"
          leftIcon={<Icon name="account" type="material-community" size={24} color="gray" />}
          leftIconContainerStyle={IconStyle}
          containerStyle={InputStyle}
          value={name}
          onChangeText={handleInput("name")}
        />
        <TextInputMask
          type="custom"
          customTextInput={Input}
          customTextInputProps={{
            containerStyle: InputStyle,
            placeholder: "ID",
            label: "ID",
            leftIcon: <Icon name="key" type="material-community" size={24} color="gray" />,
            keyboardType: "number-pad",
            leftIconContainerStyle: IconStyle,
          }}
          options={{
            mask: "9999-9999-99999",
          }}
          value={id}
          onChangeText={handleInput("id")}
        />
        <Input
          placeholder="Email"
          label="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          leftIconContainerStyle={IconStyle}
          containerStyle={InputStyle}
          leftIcon={<Icon name="email" type="material-community" size={24} color="gray" />}
          value={email}
          onChangeText={handleInput("email")}
        />
        <Input
          secureTextEntry
          placeholder="contraseña"
          label="Contraseña"
          autoCompleteType="password"
          leftIconContainerStyle={IconStyle}
          containerStyle={InputStyle}
          leftIcon={<Icon name="key" type="material-community" size={24} color="gray" />}
          value={password}
          onChangeText={handleInput("password")}
        />

        <Button title="Crear cuenta" containerStyle={ButtonStyle} />
      </CenteredView>
    );
  }
}

export default SignUp;
