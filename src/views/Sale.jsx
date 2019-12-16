import React, { PureComponent } from "react";
import { Button, Input, ListItem, Image, Avatar } from "react-native-elements";
import { StyleSheet, View, FlatList } from "react-native";
import burga from "../../assets/photos/food.png";
import fresco from "../../assets/photos/drink.png";

const styles = StyleSheet.create({
  ParallelButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 2,
  },
  ButtonContainer: { flex: 1 },
  searchBar: { marginVertical: 15 },
});

class Sale extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      menu: [
        { name: "Santa burga", price: 130, count: 0, tipo: "comida" },
        { name: "Refresco", price: 30, count: 0, tipo: "soda" },
      ],
    };
  }

  render() {
    const { query, menu } = this.state;
    const { ParallelButtonContainer, ButtonContainer, searchBar } = styles;
    const handleInput = text => {
      console.log(text);
    };

    return (
      <View style={{ flex: 1 }}>
        <Input
          placeholder="Busqueda"
          rightIcon={{
            name: "magnify",
            type: "material-community",
            size: 24,
            color: "gray",
          }}
          value={query}
          containerStyle={searchBar}
          onChangeText={handleInput}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={menu}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                leftIcon={{
                  name: "minus",
                  type: "material-community",
                  reverse: true,
                  reverseColor: "white",
                  color: "#FFC107",
                  size: 20,
                  onPress: () => {},
                }}
                rightIcon={{
                  name: "plus",
                  type: "material-community",
                  reverse: true,
                  reverseColor: "white",
                  color: "#FFC107",
                  size: 20,
                  onPress: () => {},
                }}
                rightTitle="0"
                leftAvatar={<Avatar source={item.tipo === "comida" ? burga : fresco} size="medium" />}
                subtitle={`L. ${item.price}`}
                bottomDivider
              />
            )}
          />
        </View>
        <View style={ParallelButtonContainer}>
          <Button title="OK" containerStyle={ButtonContainer} />
          <Button title="Cancelar" containerStyle={ButtonContainer} />
        </View>
      </View>
    );
  }
}

export default Sale;
