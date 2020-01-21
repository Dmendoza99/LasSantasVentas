import React, { PureComponent } from "react";
import { View, FlatList, Alert, ToastAndroid, ActivityIndicator, Picker } from "react-native";
import { ListItem, Avatar, Icon, Text, Overlay, Input, Button } from "react-native-elements";
import { theme, categories } from "../Constants";
import { Products, Auth } from "../firebase";
import meal from "../../assets/photos/food.png";
import softdrink from "../../assets/photos/softdrink.png";
import harddrink from "../../assets/photos/harddrink.png";
import hotdrink from "../../assets/photos/hotdrink.png";
import dessert from "../../assets/photos/dessert.png";
import extra from "../../assets/photos/extra.png";

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
    const { products, showEdit, price, name, categorie, id } = this.state;
    let sourceEdit;

    switch (categorie) {
      case 0:
        sourceEdit = meal;
        break;
      case 1:
        sourceEdit = softdrink;
        break;
      case 2:
        sourceEdit = harddrink;
        break;
      case 3:
        sourceEdit = hotdrink;
        break;
      case 4:
        sourceEdit = dessert;
        break;
      case 5:
        sourceEdit = extra;
        break;
      default:
        break;
    }
    return (
      <View style={{ flex: 1, padding: 5 }}>
        {products.length > 0 ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={products}
            renderItem={({ item }) => {
              return (
                <ListItem
                  key={item.id}
                  title={item.name}
                  subtitle={`L. ${item.price.toFixed(2)}`}
                  leftAvatar={() => {
                    let source;
                    switch (item.categorie) {
                      case 0:
                        source = meal;
                        break;
                      case 1:
                        source = softdrink;
                        break;
                      case 2:
                        source = harddrink;
                        break;
                      case 3:
                        source = hotdrink;
                        break;
                      case 4:
                        source = dessert;
                        break;
                      case 5:
                        source = extra;
                        break;
                      default:
                        break;
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
                        { text: "Cancelar" },
                        {
                          text: "OK",
                          onPress: () => {
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
                  // eslint-disable-next-line react/no-array-index-key
                  <Picker.Item key={index} label={cat} value={index} />
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
                  { text: "Cancelar" },
                  {
                    text: "OK",
                    onPress: () => {
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
                    },
                  },
                ]);
              }}
            />
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
          </View>
        </Overlay>
      </View>
    );
  }
}

export default ListProducts;
