import React, { PureComponent } from "react";
import { Dimensions, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { BarChart } from "react-native-chart-kit";

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

    this.state = {};
  }

  render() {
    const { chart } = style;
    return (
      <ScrollView style={{ padding: 10 }}>
        <Text h4>¡Ventas de la semana!</Text>
        <Text h6>En lempiras</Text>
        <BarChart
          fromZero
          data={{
            labels: ["Viernes", "Sabado", "Domingo"],
            datasets: [
              {
                data: [130 * 5, 160 * 2, 100 * 4],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").height * 0.5}
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
        <Text h4>¡Ventas del mes!</Text>
        <Text h6>En lempiras</Text>
        <BarChart
          fromZero
          data={{
            labels: ["Viernes", "Sabado", "Domingo"],
            datasets: [
              {
                data: [130 * 15, 160 * 10, 100 * 12],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").height * 0.5}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 0.5) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={chart}
        />
      </ScrollView>
    );
  }
}

export default Home;
