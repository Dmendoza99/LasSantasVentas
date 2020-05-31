import React, { PureComponent } from "react";
import {
  View,
  FlatList,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  Picker,
  StatusBar,
  StyleSheet,
} from "react-native";
import { ListItem, Avatar, Icon, Text, Overlay, Input, Button } from "react-native-elements";
import { theme, categories, categoriesPhotos } from "../Constants";
import { Products, Auth } from "../firebase";

const styles = StyleSheet.create({
  centeredText: { textAlign: "center" },
  zeroPadding: { padding: 0, height: "auto", flex: 1 },
  containerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fullSize: { flex: 1 },
});

class ListProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showEdit: false,
      price: 0,
      name: "",
      categorie: 0,
      id: "",
      query: "",
    };
  }

  getAllProducts = () => {
    if (Auth.currentUser !== null) {
      Products(Auth.currentUser.uid)
        .get()
        .then(querySnap => {
          const products = [];
          querySnap.forEach(doc => {
            products.push({ ...doc.data(), id: doc.id });
          });
          this.setState({ products });
        });
    }
  };

  componentDidMount = () => {
    this.getAllProducts();
  };

  render() {
    const { products, showEdit, price, name, categorie, id, query } = this.state;
    const { centeredText } = styles;
    const sourceEdit = categoriesPhotos[categorie];

    return (
      <View style={{ flex: 1, padding: 5, paddingTop: StatusBar.currentHeight + 5 }}>
        <Input
          placeholder="Busqueda"
          disabled={products.length <= 0}
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
                    key={item.id}
                    title={item.name}
                    subtitle={`L. ${item.price.toFixed(2)}`}
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
                    rightIcon={{
                      name: "delete",
                      type: "material-community",
                      onPress: () => {
                        Alert.alert("Confirmacion", "Seguro queres borrar este producto?", [
                          { text: "Cancelar" },
                          {
                            text: "OK",
                            onPress: () => {
                              if (Auth.currentUser !== null) {
                                Products(Auth.currentUser.uid)
                                  .doc(item.id)
                                  .delete()
                                  .then(() => {
                                    ToastAndroid.show(
                                      "Producto eliminado con exito",
                                      ToastAndroid.SHORT
                                    );
                                    this.getAllProducts();
                                  });
                              }
                            },
                          },
                        ]);
                      },
                    }}
                    rightTitle={
                      // eslint-disable-next-line react/jsx-wrap-multilines
                      <Icon
                        name="pencil"
                        color="rgba(0,0,0,0.54)"
                        onPress={() => {
                          this.setState({
                            showEdit: true,
                            name: item.name,
                            price: item.price,
                            id: item.id,
                            categorie: item.categorie,
                          });
                        }}
                        type="material-community"
                      />
                    }
                    bottomDivider
                  />
                );
              }
              return <></>;
            }}
          />
        ) : (
          <View>
            {products.length > 0 ? (
              <View>
                <Text h3 style={centeredText}>
                  Los datos estan cargando...
                </Text>
                <ActivityIndicator size={60} color={theme.colors.secondary} />
              </View>
            ) : (
              <View>
                <Text h3 style={centeredText}>
                  Parece que no hay productos
                </Text>
              </View>
            )}
          </View>
        )}
        <Overlay
          isVisible={showEdit}
          onBackdropPress={() => {
            this.setState({ showEdit: false });
          }}
          overlayStyle={{ height: "auto", padding: 40 }}
          animationType="fade"
          animated>
          <View style={{ flexDirection: "row" }}>
            <Avatar
              source={sourceEdit}
              overlayContainerStyle={{ backgroundColor: "white", flex: 1 }}
              size="large"
            />
            <View style={{ flex: 2 }}>
              <Input
                label="Nombre"
                placeholder="Hamburguesa"
                onChangeText={text => {
                  this.setState({ name: text });
                }}
                value={name}
                autoCapitalize="words"
              />
              <Input
                label="Precio"
                placeholder="L. 130.00"
                onChangeText={text => {
                  const number = Number.parseFloat(text);
                  this.setState({ price: number });
                }}
                value={price.toFixed(2).toString()}
                keyboardType="number-pad"
              />
              <Picker
                selectedValue={categorie}
                onValueChange={categoria => this.setState({ categorie: categoria })}>
                {categories.map((cat, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Picker.Item key={index} label={cat} value={index} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 5 }}>
            <Button
              title="Cancelar"
              containerStyle={{ flex: 1, paddingHorizontal: 2 }}
              onPress={() => {
                this.setState({
                  showEdit: false,
                  name: "",
                  id: "",
                  price: 0,
                  categorie: 0,
                });
              }}
            />
            <Button
              title="OK"
              containerStyle={{ flex: 1, paddingHorizontal: 2 }}
              onPress={() => {
                Alert.alert("Confirmacion", "Seguro queres actualizar este producto?", [
                  { text: "Cancelar" },
                  {
                    text: "OK",
                    onPress: () => {
                      if (Auth.currentUser !== null) {
                        Products(Auth.currentUser.uid)
                          .doc(id)
                          .update({ name, price, categorie })
                          .then(() => {
                            this.setState({
                              showEdit: false,
                              name: "",
                              id: "",
                              price: 0,
                              categorie: 0,
                            });
                            ToastAndroid.show("Producto actualizado con exito", ToastAndroid.SHORT);
                            this.getAllProducts();
                          });
                      }
                    },
                  },
                ]);
              }}
            />
          </View>
        </Overlay>
      </View>
    );
  }
}

export default ListProducts;
