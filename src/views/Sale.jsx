import React, { PureComponent } from "react";
import { Button, ListItem, Avatar } from "react-native-elements";
import { StyleSheet, View, FlatList } from "react-native";
import meal from "../../assets/photos/food.png";
import softdrink from "../../assets/photos/softdrink.png";
import harddrink from "../../assets/photos/harddrink.png";
import { theme } from "../Constants";
import { Menu } from "../firebase";

const styles = StyleSheet.create({
  ParallelButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  ButtonContainer: { flex: 1 },
});

class Sale extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      menu: [],
    };
  }

  componentDidMount = () => {
    Menu.get().then(querySnap => {
      const menu = [];
      querySnap.forEach(doc => {
        menu.push({ ...doc.data(), count: 0 });
      });
      this.setState({ menu });
    });
  };

  render() {
    const { menu } = this.state;
    const { ParallelButtonContainer, ButtonContainer } = styles;

    return (
      <View style={{ flex: 1 }}>
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
                  color: theme.colors.secondary,
                  size: 20,
                  onPress: () => {
                    this.setState({
                      menu: menu.map((food, i) => ({
                        ...food,
                        count: food === item && food.count > 0 ? food.count - 1 : food.count,
                      })),
                    });
                  },
                }}
                rightIcon={{
                  name: "plus",
                  type: "material-community",
                  reverse: true,
                  reverseColor: "white",
                  color: theme.colors.secondary,
                  size: 20,
                  onPress: () => {
                    this.setState({
                      menu: menu.map((food, i) => ({
                        ...food,
                        count: food === item ? food.count + 1 : food.count,
                      })),
                    });
                  },
                }}
                rightTitle={`${item.count}`}
                leftAvatar={() => {
                  let source;
                  if (item.type === "food") {
                    source = meal;
                  } else if (item.type === "softdrink") {
                    source = softdrink;
                  } else if (item.type === "harddrink") {
                    source = harddrink;
                  }
                  return <Avatar source={source} size="medium" />;
                }}
                subtitle={`L. ${item.price}`}
                bottomDivider
              />
            )}
          />
        </View>
        <View style={ParallelButtonContainer}>
          <Button
            title="OK"
            containerStyle={ButtonContainer}
            onPress={() => {
              const order = menu.filter(value => value.count > 0);
              console.log(order);
            }}
          />
          <Button title="Cancelar" containerStyle={ButtonContainer} />
        </View>
      </View>
    );
  }
}

export default Sale;
