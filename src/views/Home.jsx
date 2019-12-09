import React, { PureComponent } from "react";
import { Text } from "react-native";
import CenteredView from "../components/CenteredView";

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <CenteredView>
        <Text>Hello from Home!</Text>
      </CenteredView>
    );
  }
}

export default Home;
