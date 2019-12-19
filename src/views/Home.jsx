import React, { PureComponent } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BarChart } from "react-native-chart-kit";
import { Orders } from "../firebase";

const style = StyleSheet.create({
  chart: {
    marginVertical: 8,
    marginHorizontal: 50,
    borderRadius: 16,
    alignSelf: "center",
  },
});

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { orders: [], date: new Date() };
    Orders.once("value", data => {
      const aux = data.exportVal();
      this.setState({ orders: Object.values(aux) });
    });
  }

  render() {
    const { orders, date } = this.state;
    const getWeekReport = () => {
      const labels = ["wenas", "wenas"];
      const dataset = [];
      orders.map(data => {
        const curr = new Date();
        const dataDate = new Date(data.date).toLocaleDateString();
        const Sunday = new Date(curr.setDate(curr.getDate() - curr.getDay())).toLocaleDateString();
        const Monday = new Date(
          curr.setDate(curr.getDate() - curr.getDay() + 1)
        ).toLocaleDateString();
        const Tuesday = new Date(
          curr.setDate(curr.getDate() - curr.getDay() + 2)
        ).toLocaleDateString();
        const Wednesday = new Date(
          curr.setDate(curr.getDate() - curr.getDay() + 3)
        ).toLocaleDateString();
        const Thursday = new Date(
          curr.setDate(curr.getDate() - curr.getDay() + 4)
        ).toLocaleDateString();
        const Friday = new Date(
          curr.setDate(curr.getDate() - curr.getDay() + 5)
        ).toLocaleDateString();
        const Saturday = new Date(
          curr.setDate(curr.getDate() - curr.getDay() + 6)
        ).toLocaleDateString();

        console.log("Hola", curr.toLocaleDateString());
        console.log("Viernes", Friday);
        console.log("Sabado", Saturday);
        console.log(Saturday);
        switch (curr.toLocaleDateString()) {
          case Friday:
            break;
          case Saturday:
            break;
          case Sunday:
            break;
          default:
            console.log("es otro dia");
            break;
        }
      });
      return {
        labels,
        datasets: [
          {
            data: [130 * 2, 160 * 2, 100 * 4],
          },
        ],
      };
    };

    const { chart } = style;
    return (
      <View style={{ padding: 10 }}>
        <Text h4>Ventas</Text>
        <Text h6>En lempiras</Text>
        <BarChart
          fromZero
          data={getWeekReport()}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").height * 0.75}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              paddingHorizontal: 250,
            },
          }}
          style={chart}
        />
      </View>
    );
  }
}

export default Home;
