import React, { PureComponent } from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";

class Waiting extends PureComponent {
  render() {
    return (
      <View
        style={{
          backgroundColor: "#FF9800",
          justifyContent: "center",
          alignItems: "center",
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
        >
        <ActivityIndicator size={60} color="white" />
      </View>
    );
  }
}

export default Waiting;
