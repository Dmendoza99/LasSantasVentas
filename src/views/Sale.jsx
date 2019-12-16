import React, { PureComponent } from "react";
import { Text } from "react-native-elements";
import CenteredView from "../components/CenteredView";

class Sale extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <CenteredView>
        <Text>Hello from Sale!</Text>
      </CenteredView>
    );
  }
}

export default Sale;
