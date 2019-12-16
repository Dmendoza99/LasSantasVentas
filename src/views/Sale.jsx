import React, { PureComponent } from "react";
import { Button, ListItem, Avatar, Text, Input, Overlay } from "react-native-elements";
import { StyleSheet, View, FlatList, ActivityIndicator, Alert, ToastAndroid } from "react-native";
import meal from "../../assets/photos/food.png";
import softdrink from "../../assets/photos/softdrink.png";
import harddrink from "../../assets/photos/harddrink.png";
import hotdrink from "../../assets/photos/hotdrink.png";
import dessert from "../../assets/photos/dessert.png";
import { theme } from "../Constants";
import { Products, Orders } from "../firebase";

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
      products: [],
      backupProducts: [],
      comment: "",
      showComment: false,
    };
  }

  componentDidMount = () => {
    Products.get().then(querySnap => {
      const products = [];
      querySnap.forEach(doc => {
        products.push({ ...doc.data(), count: 0 });
      });
      this.setState({ products, backupProducts: products });
    });
  };

  render() {
    const { products, comment, showComment, backupProducts } = this.state;
    const { ParallelButtonContainer, ButtonContainer } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {products.length > 0 ? (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={products}
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
                        products: products.map(food => ({
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
                        products: products.map(food => ({
                          ...food,
                          count: food === item ? food.count + 1 : food.count,
                        })),
                      });
                    },
                  }}
                  rightTitle={`${item.count}`}
                  leftAvatar={() => {
                    let source;
                    if (item.categorie === 0) {
                      source = meal;
                    } else if (item.categorie === 1) {
                      source = softdrink;
                    } else if (item.categorie === 2) {
                      source = harddrink;
                    } else if (item.categorie === 3) {
                      source = hotdrink;
                    } else if (item.categorie === 4) {
                      source = dessert;
                    }
                    return (
                      <Avatar
                        source={source}
                        overlayContainerStyle={{ backgroundColor: "white" }}
                        size="medium"
                      />
                    );
                  }}
                  subtitle={`L. ${item.price.toFixed(2)}`}
                  bottomDivider
                />
              )}
            />
          ) : (
            <View>
              <Text h3 style={{ textAlign: "center" }}>
                Los datos estan cargando...
              </Text>
              <ActivityIndicator size={60} color={theme.colors.secondary} />
            </View>
          )}
        </View>
        <Overlay
          isVisible={showComment}
          overlayStyle={{ height: "auto", padding: 25 }}
          animationType="fade"
          animated>
          <Input
            placeholder="Ejem. una Santa burga sin cebolla"
            label="Comentario"
            value={comment}
            onChangeText={text => this.setState({ comment: text })}
            multiline
          />
          <Button
            title="OK"
            containerStyle={{ paddingVertical: 5 }}
            onPress={() => {
              this.setState({ showComment: false });
            }}
          />
          <Button
            title="Cancelar"
            containerStyle={{ paddingVertical: 5 }}
            onPress={() => {
              this.setState({ comment: "", showComment: false });
            }}
          />
        </Overlay>
        <View style={ParallelButtonContainer}>
          <Button
            title="OK"
            containerStyle={ButtonContainer}
            onPress={() => {
              const items = products.filter(value => value.count > 0);
              if (items.length > 0) {
                const order = { items, comment, active: true, date: new Date().getTime() };
                Alert.alert(
                  "Confirmacion",
                  "Seguro queres publicar esta orden?",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        Orders.push(order).then(() => {
                          ToastAndroid.show(
                            "La orden se ha publicado con exito",
                            ToastAndroid.SHORT
                          );
                        });
                      },
                    },
                    {
                      text: "Cancel",
                    },
                  ],
                  { cancelable: false }
                );

                this.setState({ products: backupProducts, comment: "" });
              } else {
                Alert.alert("Error", "La orden debe tener almenos un producto.");
              }
            }}
          />
          <Button
            title="Comentario"
            containerStyle={ButtonContainer}
            onPress={() => {
              this.setState({ showComment: true });
            }}
          />
          <Button
            title="Cancelar"
            containerStyle={ButtonContainer}
            onPress={() => {
              this.setState({ products: backupProducts, comment: "" });
            }}
          />
        </View>
      </View>
    );
  }
}

export default Sale;
