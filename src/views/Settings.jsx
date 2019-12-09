import React, { PureComponent } from "react";
import { Text } from "react-native";
import CenteredView from "../components/CenteredView";

class Settings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <CenteredView>
        <Text>Hello from Settings!</Text>
      </CenteredView>
    );
  }
}

export default Settings;
