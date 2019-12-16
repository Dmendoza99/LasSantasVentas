import React, { PureComponent } from "react";
import { ButtonGroup, ListItem, Text } from "react-native-elements";
import { View, FlatList, ActivityIndicator, ToastAndroid, Alert } from "react-native";
import { Orders as OrdersDB } from "../firebase";
import { theme } from "../Constants";

class Orders extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { selectedIndex: 0, orders: [], filterredOrders: [] };
  }

  componentDidMount = () => {
    OrdersDB.on("value", data => {
      const all = data.toJSON();
      const orders = [];
      Object.keys(all).map(key => orders.push({ ...all[key], key }));
      this.setState(state => ({
        orders,
        filterredOrders: orders.filter(order =>
          state.selectedIndex === 0 ? order.active : !order.active
        ),
      }));
    });
  };

  componentWillUnmount = () => {
    OrdersDB.off("value");
  };

  render() {
    const updateIndex = selectedIndex => {
      this.setState(state => ({
        selectedIndex,
        filterredOrders: state.orders.filter(order =>
          selectedIndex === 0 ? order.active : !order.active
        ),
      }));
    };

    const buttons = ["Abiertas", "Cerradas"];
    const { selectedIndex, filterredOrders, orders } = this.state;

    return (
      <View>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{}}
        />
        {filterredOrders.length > 0 ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={filterredOrders}
            renderItem={({ item }) => {
              let total = 0;
              Object.keys(item.items).map(
                val => (total += item.items[val].price * item.items[val].count)
              );
              const date = new Date(item.date);
              return (
                <ListItem
                  title={`Orden ${item.key}`}
                  subtitle={`${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
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
                                  text: "OK",
                                  onPress: () => {
                                    OrdersDB.child(item.key)
                                      .update({ active: false })
                                      .then(() => {
                                        ToastAndroid.show(
                                          "Orden Cerrada Exitosamente",
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
                          },
                        }
                      : null
                  }
                  rightElement={<Text>{`L. ${total.toFixed(2)}`}</Text>}
                  bottomDivider
                />
              );
            }}
          />
        ) : (
          <View>
            {orders.length <= 0 ? (
              <View>
                <Text h3 style={{ textAlign: "center" }}>
                  Los datos estan cargando...
                </Text>
                <ActivityIndicator size={60} color={theme.colors.secondary} />
              </View>
            ) : (
              <View>
                <Text h3 style={{ textAlign: "center" }}>
                  Parece que no hay ordenes
                  {selectedIndex === 0 ? " abiertas" : " cerradas"}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default Orders;
