import React, { PureComponent } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { BarChart } from "react-native-chart-kit";
import { Orders, Auth } from "../firebase";

const style = StyleSheet.create({
  chart: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 16,
    alignSelf: "center",
  },
});

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { orders: [] };
  }

  componentDidMount = () => {
    if (Auth.currentUser !== null) {
      Orders(Auth.currentUser.uid).once("value", data => {
        const aux = data.exportVal();
        this.setState({ orders: Object.values(aux) });
      });
    }
  };

  render() {
    const getWeekReport = () => {
      const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const { orders } = this.state;
      const reportMonths = {};
      const d = new Date();
      for (let i = 0; i < 3; i += 1) {
        reportMonths[`${months[d.getMonth()]}/${d.getFullYear().toString()}`] = 0;
        d.setMonth(d.getMonth() - 1);
      }

      // eslint-disable-next-line array-callback-return
      orders.map(order => {
        const saleDate = new Date(order.saleDate);
        const month = `${months[saleDate.getMonth()]}/${saleDate.getFullYear().toString()}`;
        let total = Object.values(order.items).reduce((acc, { price, count }) => {
          return acc + price * count;
        }, 0);
        total -= total * order.discount;
        if (month in reportMonths) {
          reportMonths[month] += total;
        }
      });
      return {
        labels: [...Object.keys(reportMonths)],
        datasets: [
          {
            data: [...Object.values(reportMonths)],
          },
        ],
      };
    };

    const { chart } = style;
    return (
      <View style={{ padding: 10 }}>
        <Text h4>Ventas de los ultimos 3 meses</Text>
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
          }}
          style={chart}
        />
      </View>
    );
  }
}

export default Home;
