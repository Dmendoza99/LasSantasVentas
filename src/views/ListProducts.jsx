import React, { PureComponent } from "react";
import { View, FlatList, Alert, ToastAndroid, ActivityIndicator, Picker } from "react-native";
import { ListItem, Avatar, Icon, Text, Overlay, Input, Button } from "react-native-elements";
import { theme, categories } from "../Constants";
import { Products } from "../firebase";
import meal from "../../assets/photos/food.png";
import softdrink from "../../assets/photos/softdrink.png";
import harddrink from "../../assets/photos/harddrink.png";
import hotdrink from "../../assets/photos/hotdrink.png";
import dessert from "../../assets/photos/dessert.png";

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
    };
  }

  getAllProducts = () => {
    Products.get().then(querySnap => {
      const products = [];
      querySnap.forEach(doc => {
        products.push({ ...doc.data(), id: doc.id });
      });
      this.setState({ products });
    });
  };

  componentDidMount = () => {
    this.getAllProducts();
  };

  render() {
    const { products, showEdit, price, name, categorie, id } = this.state;
    let sourceEdit;
    if (categorie === 0) {
      sourceEdit = meal;
    } else if (categorie === 1) {
      sourceEdit = softdrink;
    } else if (categorie === 2) {
      sourceEdit = harddrink;
    } else if (categorie === 3) {
      sourceEdit = hotdrink;
    } else if (categorie === 4) {
      sourceEdit = dessert;
    }
    return (
      <View style={{ flex: 1 }}>
        {products.length > 0 ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={products}
            renderItem={({ item }) => {
              return (
                <ListItem
                  title={item.name}
                  subtitle={`L. ${item.price.toFixed(2)}`}
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
                  rightIcon={{
                    name: "delete",
                    type: "material-community",
                    onPress: () => {
                      Alert.alert("Confirmacion", "Seguro queres borrar este producto?", [
                        {
                          text: "OK",
                          onPress: () => {
                            Products.doc(item.id)
                              .delete()
                              .then(() => {
                                ToastAndroid.show(
                                  "Producto eliminado con exito",
                                  ToastAndroid.SHORT
                                );
                                this.getAllProducts();
                              });
                          },
                        },
                        { text: "Cancelar" },
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
        <Overlay
          isVisible={showEdit}
          onBackdropPress={() => {
            this.setState({ showEdit: false });
          }}
          overlayStyle={{ height: "auto", padding: 40 }}>
          <View style={{ flexDirection: "row" }}>
            <Avatar
              source={sourceEdit}
              overlayContainerStyle={{ backgroundColor: "white", flex: 1 }}
              size="large"
            />
            <View style={{ flex: 2 }}>
              <Input
                label="Nombre"
                placeholder="Santa burga"
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
                  <Picker.Item label={cat} value={index} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 5 }}>
            <Button
              title="OK"
              containerStyle={{ flex: 1, paddingHorizontal: 2 }}
              onPress={() => {
                Alert.alert("Confirmacion", "Seguro queres actualizar este producto?", [
                  {
                    text: "OK",
                    onPress: () => {
                      Products.doc(id)
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
                    },
                  },
                  { text: "Cancelar" },
                ]);
              }}
            />
            <Button
              title="Cancelar"
              containerStyle={{ flex: 1, paddingHorizontal: 2 }}
              onPress={() => {
                console.log(this.state);
                this.setState({
                  showEdit: false,
                  name: "",
                  id: "",
                  price: 0,
                  categorie: 0,
                });
              }}
            />
          </View>
        </Overlay>
      </View>
    );
  }
}

export default ListProducts;
