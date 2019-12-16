import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { Auth } from "../firebase";

class Settings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const list = [
      {
        name: "Cerrar sesión",
        icon: { name: "logout", type: "material-community" },
        onPress: () => {
          Auth.signOut();
        },
      },
    ];
    
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={list}
        renderItem={({ item }) => (
          <ListItem
            onPress={item.onPress}
            title={item.name}
            subtitle={item.subtitle}
            rightIcon={item.icon}
            bottomDivider
          />
        )}
      />
    );
  }
}

export default Settings;
