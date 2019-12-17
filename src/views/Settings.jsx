import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import { Auth } from "../firebase";

class Settings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { navigation } = this.props;

    const list = [
      {
        name: "Crear Productos",
        icon: { name: "plus", type: "material-community" },
        onPress: () => {
          navigation.navigate(
            "Settings",
            {},
            NavigationActions.navigate({ routeName: "CreateProducts" })
          );
        },
      },
      {
        name: "Editar Productos",
        icon: { name: "pencil", type: "material-community" },
        onPress: () => {
          navigation.navigate(
            "Settings",
            {},
            NavigationActions.navigate({ routeName: "EditProducts" })
          );
        },
      },
      {
        name: "Eliminar Productos",
        icon: { name: "delete", type: "material-community" },
        onPress: () => {
          navigation.navigate(
            "Settings",
            {},
            NavigationActions.navigate({ routeName: "EliminateProducts" })
          );
        },
      },
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
