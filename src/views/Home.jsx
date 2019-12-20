import React, { PureComponent } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
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

    // eslint-disable-next-line react/no-unused-state
    this.state = { orders: [], date: new Date() };
    Orders.once("value", data => {
      const aux = data.exportVal();
      // eslint-disable-next-line react/no-unused-state
      this.setState({ orders: Object.values(aux) });
    });
  }

  render() {
    const getWeekReport = () => {
      return {
        labels: ["Viernes", "Sabado", "Domingo"],
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
