import React, { PureComponent } from "react";
import { Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";

const style = StyleSheet.create({
  title: { fontWeight: "bold", fontSize: 20, textAlign: "left", margin: 10 },
  chart: {
    marginVertical: 8,
    marginHorizontal: 50,
    borderRadius: 16,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 10,
    textAlign: "left",
    marginLeft: 10,
  },
});

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, chart, subtitle } = style;
    return (
      <ScrollView>
        <Text style={title}>¡Ventas de la semana!</Text>
        <Text style={subtitle}>En lempiras</Text>
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
        <Text style={title}>¡Ventas del mes!</Text>
        <Text style={subtitle}>En lempiras</Text>
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
