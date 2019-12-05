import React, { PureComponent } from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import { theme } from "../Constants";

class Waiting extends PureComponent {
  render() {
    return (
      <View
        style={{
          backgroundColor: theme.colors.primary,
          justifyContent: "center",
          alignItems: "center",
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}>
        <ActivityIndicator size={60} color="white" />
      </View>
    );
  }
}

export default Waiting;
