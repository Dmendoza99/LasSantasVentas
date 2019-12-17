import React, { PureComponent } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

class EditProducts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>hello from edit</Text>
      </View>
    );
  }
}

export default EditProducts;
