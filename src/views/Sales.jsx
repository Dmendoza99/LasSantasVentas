import React, { PureComponent } from "react";
import { Text } from "react-native";
import CenteredView from "../components/CenteredView";

class Sales extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <CenteredView>
        <Text>Hello from Sales!</Text>
      </CenteredView>
    );
  }
}

export default Sales;
