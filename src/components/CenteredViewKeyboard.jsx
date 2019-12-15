import React, { PureComponent } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";

const styles = StyleSheet.create({
  Outer: { justifyContent: "center", flex: 1 },
  Inner: { flex: 1, justifyContent: "center", alignItems: "center" },
});

class CenteredViewKeyboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, OuterStyle, InnerStyle } = this.props;
    const { Outer, Inner } = styles;
    return (
      <KeyboardAvoidingView behavior="height" enabled style={{ ...Outer, ...OuterStyle }}>
        <View style={{ ...Inner, ...InnerStyle }}>{children}</View>
      </KeyboardAvoidingView>
    );
  }
}

export default CenteredViewKeyboard;
