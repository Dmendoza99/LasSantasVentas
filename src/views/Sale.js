import React, { PureComponent } from "react";
import { Button, ListItem, Avatar, Text, Input, Overlay } from "react-native-elements";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  StatusBar,
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import validator from "validator";
import { theme, categoriesPhotos } from "../Constants";
import { Products, Orders, Auth } from "../firebase";

const styles = StyleSheet.create({
  ParallelButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
  },
  ButtonContainer: { flex: 1, marginHorizontal: 2 },
  flatlistContainer: { flex: 6 },
});

class Sale extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      backupProducts: [],
      comment: "",
      showComment: false,
      update: false,
      updatekey: "",
      owner: "",
      descuento: "",
      query: "",
    };
  }

  componentDidMount = () => {
    if (Auth.currentUser !== null) {
      Products(Auth.currentUser.uid)
        .get()
        .then(querySnap => {
          const products = [];
          querySnap.forEach(doc => {
            products.push({ ...doc.data(), count: 0, id: doc.id });
          });
          this.setState({ products, backupProducts: products });
        });
    }
  };

  componentDidUpdate = prevProps => {
    const { isFocused, navigation } = this.props;
    if (prevProps.isFocused === false && isFocused) {
      const selectedOrder = navigation.getParam("selectedOrder", "shit");
      if (selectedOrder !== "shit") {
        const { products } = this.state;
        const selected = [...Object.values(selectedOrder.items)];
        let productos = products;
        selected.map(selc => (productos = productos.filter(value => value.id !== selc.id)));
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          comment: selectedOrder.comment,
          products: [...productos, ...selected],
          owner: selectedOrder.owner,
          update: true,
          updatekey: selectedOrder.key,
          descuento: String(selectedOrder.discount),
        });
      }
    }
  };

  render() {
    const {
      products,
      comment,
      showComment,
      backupProducts,
      update,
      updatekey,
      owner,
      descuento,
      query,
    } = this.state;
    const { ParallelButtonContainer, ButtonContainer, flatlistContainer } = styles;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, padding: 10, paddingTop: StatusBar.currentHeight + 10 }}>
        <Input
          placeholder="Busqueda"
          value={query}
          rightIcon={
            query.length === 0
              ? {
                  name: "magnify",
                  type: "material-community",
                  color: theme.colors.secondary,
                  size: 35,
                }
              : {
                  name: "close",
                  type: "material-community",
                  size: 35,
                  color: theme.colors.secondary,
                  onPress: () => {
                    this.setState({ query: "" });
                  },
                }
          }
          onChangeText={text => {
            this.setState({ query: text });
          }}
        />
        <View style={flatlistContainer}>
          {products.length > 0 ? (
            <FlatList
              keyExtractor={item => item.id}
              data={products}
              ItemSeparatorComponent={({ leadingItem }) => {
                const searchRegex = new RegExp(
                  query
                    .toLowerCase()
                    .split(/ /)
                    .filter(l => l !== "")
                    .join("|"),
                  "i"
                );
                const r1 = leadingItem.name.toLowerCase().search(searchRegex);
                if (r1 !== -1 && query.length >= 0) {
                  return (
                    <View
                      style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#00000009",
                      }}
                    />
                  );
                }
                return <></>;
              }}
              renderItem={({ item }) => {
                const searchRegex = new RegExp(
                  query
                    .toLowerCase()
                    .split(/ /)
                    .filter(l => l !== "")
                    .join("|"),
                  "i"
                );
                const r1 = item.name.toLowerCase().search(searchRegex);
                if (r1 !== -1 && query.length >= 0) {
                  return (
                    <ListItem
                      bottomDivider
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
                        const source = categoriesPhotos[item.categorie];

                        return (
                          <Avatar
                            source={source}
                            overlayContainerStyle={{ backgroundColor: "white" }}
                            size="medium"
                          />
                        );
                      }}
                      subtitle={`L. ${item.price.toFixed(2)}`}
                    />
                  );
                }
                return <></>;
              }}
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
            placeholder="Ejem. Juan Perez"
            label="Dueño de la orden"
            value={owner}
            onChangeText={text => this.setState({ owner: text })}
          />
          <Input
            placeholder="Por defecto 0%"
            label="Descuento"
            value={descuento}
            keyboardType="number-pad"
            onChangeText={text => {
              this.setState({ descuento: text });
            }}
          />
          <Input
            placeholder="Ejem. una hamburguesa sin cebolla"
            label="Comentario"
            value={comment}
            onChangeText={text => this.setState({ comment: text })}
            multiline
          />
          <View style={{ flexDirection: "row", paddingTop: 5 }}>
            <Button
              title="Cancelar"
              containerStyle={{ paddingHorizontal: 2, flex: 1 }}
              onPress={() => {
                this.setState({ comment: "", showComment: false });
              }}
            />
            <Button
              title="OK"
              containerStyle={{ paddingHorizontal: 2, flex: 1 }}
              onPress={() => {
                const items = products.filter(value => value.count > 0);
                if (items.length !== 0) {
                  const order = {
                    items,
                    comment,
                    active: true,
                    owner,
                    saleDate: new Date().getTime(),
                    sellerUID: Auth.currentUser.uid,
                    discount: Number.parseInt(descuento === "" ? "0" : descuento, 10),
                  };
                  if (validator.isEmpty(order.owner)) {
                    Alert.alert("Error", "Por favor llene el campo dueño");
                    return;
                  }

                  Alert.alert(
                    "Confirmacion",
                    "Seguro queres publicar esta orden?",
                    [
                      {
                        text: "Cancelar",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          if (Auth.currentUser !== null) {
                            if (update) {
                              delete order.date;
                              Orders(Auth.currentUser.uid)
                                .child(updatekey)
                                .update({ ...order })
                                .then(() => {
                                  this.setState({ update: false, updatekey: "" });
                                  navigation.setParams({ selectedOrder: "shit" });
                                  ToastAndroid.show(
                                    "La orden se ha actualizado con exito",
                                    ToastAndroid.SHORT
                                  );
                                });
                            } else {
                              Orders(Auth.currentUser.uid)
                                .push(order)
                                .then(() => {
                                  ToastAndroid.show(
                                    "La orden se ha publicado con exito",
                                    ToastAndroid.SHORT
                                  );
                                });
                            }
                          }
                        },
                      },
                    ],
                    { cancelable: false }
                  );

                  this.setState({
                    products: backupProducts,
                    comment: "",
                    showComment: false,
                    owner: "",
                    descuento: "",
                  });
                } else {
                  Alert.alert("Error", "La orden debe tener almenos un producto.");
                }
              }}
            />
          </View>
        </Overlay>
        <View style={ParallelButtonContainer}>
          <Button
            title="Cancelar"
            containerStyle={ButtonContainer}
            onPress={() => {
              const itemsCount = products.filter(value => value.count > 0).length;
              if (itemsCount !== 0) {
                Alert.alert("Confirmacion", "Seguro queres cancelar la orden?", [
                  { text: "Cancelar" },
                  {
                    text: "OK",
                    onPress: () => {
                      this.setState({
                        products: backupProducts,
                        comment: "",
                        update: false,
                        updatekey: "",
                        owner: "",
                        descuento: "",
                      });
                      navigation.setParams({ selectedOrder: "shit" });
                      ToastAndroid.show("La orden se ha cancelado con exito", ToastAndroid.SHORT);
                    },
                  },
                ]);
              } else {
                ToastAndroid.show("No se puede cancelar una orden vacia", ToastAndroid.SHORT);
              }
            }}
          />
          <Button
            title="OK"
            containerStyle={ButtonContainer}
            onPress={() => {
              this.setState({ showComment: true });
            }}
          />
        </View>
      </View>
    );
  }
}

export default withNavigationFocus(Sale);
