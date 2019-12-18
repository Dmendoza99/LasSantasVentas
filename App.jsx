import React, { PureComponent } from "react";
import { createAppContainer } from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { ThemeProvider, Icon } from "react-native-elements";
import Home from "./src/views/Home";
import Login from "./src/views/Login";
import Signup from "./src/views/Signup";
import Orders from "./src/views/Orders";
import CreateProducts from "./src/views/CreateProducts";
import ListProducts from "./src/views/ListProducts";
import Sale from "./src/views/Sale";
import Settings from "./src/views/Settings";
import UserValidator from "./src/components/UserValidator";
import { theme } from "./src/Constants";
import { CurrentUser, Users } from "./src/firebase";

class App extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Application />
      </ThemeProvider>
    );
  }
}

const settingStack = createStackNavigator(
  {
    Inicio: {
      screen: Settings,
    },
    ListProducts: {
      screen: ListProducts,
    },
    CreateProducts: {
      screen: CreateProducts,
    },
  },
  { headerMode: "none" }
);

if (CurrentUser !== null) {
  let data = Users.doc(CurrentUser.uid)
    .get()
    .then(data => data.data());
  console.log(data);
}
const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        tabBarLabel: "Inicio",
      }),
    },
    Orders: {
      screen: Orders,
      navigationOptions: () => ({
        tabBarLabel: "Ordenes",
      }),
    },
    Sale: {
      screen: Sale,
      navigationOptions: () => ({
        tabBarLabel: "Vender",
      }),
    },
    Settings: {
      screen: settingStack,
      navigationOptions: () => ({
        tabBarLabel: "Opciones",
      }),
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Home":
            iconName = "chart-areaspline";
            break;
          case "Orders":
            iconName = "hamburger";
            break;
          case "Sale":
            iconName = "cash";
            break;
          case "Settings":
            iconName = "settings";
            break;
          default:
            break;
        }
        return <Icon name={iconName} type="material-community" size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: theme.colors.secondary,
      inactiveTintColor: "gray",
    },
  }
);

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null,
    },
  },
  initialRouteName: "Signup",
});

const Application = createAppContainer(
  createAnimatedSwitchNavigator(
    {
      AuthLoading: UserValidator,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
      transition: (
        <Transition.Together>
          <Transition.Out type="slide-bottom" durationMs={400} interpolation="easeIn" />
          <Transition.In type="slide-top" durationMs={500} />
        </Transition.Together>
      ),
    }
  )
);

export default App;
