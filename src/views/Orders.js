import React, { PureComponent } from "react";
import { ButtonGroup, ListItem, Text, Overlay, Button, Avatar } from "react-native-elements";
import {
  View,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import validator from "validator";
import { Orders as OrdersDB, Auth } from "../firebase";
import { theme, categoriesPhotos } from "../Constants";

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

class Orders extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      orders: [],
      filterredOrders: [],
      selectedOrder: { items: {}, date: 0, comment: "" },
      showOrder: false,
    };
  }

  componentDidMount = () => {
    if (Auth.currentUser !== null) {
      OrdersDB(Auth.currentUser.uid).on("value", data => {
        const all = data.toJSON();
        const orders = [];
        if(all){
          Object.keys(all).map(key => orders.push({ ...all[key], key }));
        }
        this.setState(state => ({
          orders,
          filterredOrders: orders.filter(order =>
            state.selectedIndex === 0 ? order.active : !order.active
          ),
        }));
      });
    }
  };

  componentWillUnmount = () => {
    if (Auth.currentUser !== null) {
      OrdersDB(Auth.currentUser.uid).off("value");
    }
  };

  updateIndex = selectedIndex => {
    this.setState(state => ({
      selectedIndex,
      filterredOrders: state.orders.filter(order =>
        selectedIndex === 0 ? order.active : !order.active
      ),
    }));
  };

  render() {
    const buttons = ["Abiertas", "Cerradas"];
    const { selectedIndex, filterredOrders, orders, selectedOrder, showOrder } = this.state;
    const { navigation } = this.props;
    const { centeredText, containerBottom, fullSize } = styles;
    const saleDate = new Date(selectedOrder.saleDate);

    return (
      <View style={{ flex: 1, padding: 5, paddingTop: StatusBar.currentHeight + 5 }}>
        <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={buttons} />
        {filterredOrders.length > 0 ? (
          <FlatList
            keyExtractor={item => item.key}
            data={filterredOrders}
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
            renderItem={({ item }) => {
              let total = Object.values(item.items).reduce((acc, { price, count }) => {
                return acc + price * count;
              }, 0);
              total *= (100 - item.discount) / 100;
              return (
                <ListItem
                  title={`Orden ${item.key}`}
                  subtitle={`Dueño: ${item.owner}`}
                  leftIcon={
                    selectedIndex === 0
                      ? {
                          name: "check",
                          type: "material-community",
                          reverse: true,
                          reverseColor: "white",
                          color: theme.colors.secondary,
                          size: 20,
                          onPress: () => {
                            Alert.alert(
                              "Confirmacion",
                              "Seguro queres cerrar esta orden?",
                              [
                                {
                                  text: "Cancelar",
                                },
                                {
                                  text: "OK",
                                  onPress: () => {
                                    if (Auth.currentUser !== null) {
                                      OrdersDB(Auth.currentUser.uid)
                                        .child(item.key)
                                        .update({
                                          active: false,
                                          closingDate: new Date().getTime(),
                                        })
                                        .then(() => {
                                          ToastAndroid.show(
                                            "Orden Cerrada Exitosamente",
                                            ToastAndroid.SHORT
                                          );
                                        });
                                    }
                                  },
                                },
                              ],
                              { cancelable: false }
                            );
                          },
                        }
                      : null
                  }
                  rightElement={<Text>{`L. ${total.toFixed(2)}`}</Text>}
                  bottomDivider
                  onPress={() => {
                    this.setState({ showOrder: true, selectedOrder: item });
                  }}
                  onLongPress={() => {
                    Alert.alert("Confirmacion", "Seguro queres eliminar esta orden", [
                      { text: "Cancelar" },
                      {
                        text: "OK",
                        onPress: () => {
                          if (Auth.currentUser !== null) {
                            OrdersDB(Auth.currentUser.uid)
                              .child(item.key)
                              .remove()
                              .then(() => {
                                ToastAndroid.show("Orden Eliminada con exito", ToastAndroid.SHORT);
                              });
                          }
                        },
                      },
                    ]);
                  }}
                />
              );
            }}
          />
        ) : (
          <View>
            {orders.length > 0 ? (
              <View>
                <Text h3 style={centeredText}>
                  Los datos estan cargando...
                </Text>
                <ActivityIndicator size={60} color={theme.colors.secondary} />
              </View>
            ) : (
              <View>
                <Text h3 style={centeredText}>
                  Parece que no hay ordenes
                  {selectedIndex === 0 ? " abiertas" : " cerradas"}
                </Text>
              </View>
            )}
          </View>
        )}
        <Overlay
          isVisible={showOrder}
          onBackdropPress={() => {
            this.setState({ showOrder: false });
          }}
          overlayStyle={{
            height: "auto",
            maxHeight: Dimensions.get("screen").height * 0.5,
            padding: 25,
          }}
          animationType="fade"
          animated>
          <Text h5>{`Orden: ${selectedOrder.key}`}</Text>
          <Text h5>
            {/* eslint-disable-next-line max-len */}
            {`Fecha: ${saleDate.getHours()}:${saleDate.getMinutes()} ${saleDate.getDate()}/${saleDate.getMonth()}/${saleDate.getFullYear()}`}
          </Text>
          {validator.isEmpty(selectedOrder.comment) ? null : (
            <Text h5>{`Comentario: ${selectedOrder.comment}`}</Text>
          )}
          {selectedOrder.discount !== 0 ? (
            <Text h5>{`Descuento: ${selectedOrder.discount}%`}</Text>
          ) : null}
          <FlatList
            keyExtractor={item => item.key}
            data={Object.values(selectedOrder.items)}
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
            renderItem={({ item }) => {
              return (
                <ListItem
                  title={item.name}
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
                  bottomDivider
                />
              );
            }}
          />
          <View style={containerBottom}>
            {selectedOrder.active ? (
              <Button
                title="Editar"
                containerStyle={fullSize}
                onPress={() => {
                  this.setState({ showOrder: false });
                  navigation.navigate("Sale", { selectedOrder });
                }}
              />
            ) : null}
          </View>
        </Overlay>
      </View>
    );
  }
}

export default Orders;
