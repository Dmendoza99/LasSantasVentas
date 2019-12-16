import React, { PureComponent } from "react";
import { ButtonGroup, ListItem, Text } from "react-native-elements";
import { View, FlatList } from "react-native";

class Orders extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { selectedIndex: 0 };
  }

  render() {
    const updateIndex = selectedIndex => {
      this.setState({ selectedIndex });
    };

    const buttons = ["Abiertas", "Cerradas"];
    const { selectedIndex } = this.state;

    const Ordenes = [];
    return (
      <View>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{}}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={Ordenes}
          renderItem={item => (
            <ListItem
              onPress={item.onPress}
              title={item.name}
              subtitle={item.date}
              rightIcon={item.icon}
              leftElement={<Text>{`L. ${item.total}`}</Text>}
              bottomDivider
            />
          )}
        />
      </View>
    );
  }
}

export default Orders;
