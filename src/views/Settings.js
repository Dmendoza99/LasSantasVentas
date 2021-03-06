import React, { PureComponent } from "react";
import { FlatList, Alert, View, StatusBar } from "react-native";
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
        name: "Editar y Eliminar",
        icon: { name: "format-list-bulleted", type: "material-community" },
        onPress: () => {
          navigation.navigate(
            "Settings",
            {},
            NavigationActions.navigate({ routeName: "ListProducts" })
          );
        },
      },
      {
        name: "Cerrar sesión",
        icon: { name: "logout", type: "material-community" },
        onPress: () => {
          Alert.alert("Confirmar", "Seguro queres salir de tu cuenta", [
            { text: "Cancelar" },
            {
              text: "OK",
              onPress: () => {
                Auth.signOut();
              },
            },
          ]);
        },
      },
    ];

    return (
      <FlatList
        style={{ paddingTop: StatusBar.currentHeight }}
        keyExtractor={(item, index) => index.toString()}
        data={list}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#00000009",
              }}
            />
          );
        }}
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
