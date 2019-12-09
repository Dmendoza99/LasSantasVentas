import React, { PureComponent } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { ThemeProvider, Icon } from "react-native-elements";
import Home from "./src/views/Home";
import Login from "./src/views/Login";
import Signup from "./src/views/Signup";
import Sales from "./src/views/Sales";
import Settings from "./src/views/Settings";
import UserValidator from "./src/components/UserValidator";
import { theme } from "./src/Constants";

class App extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Application />
      </ThemeProvider>
    );
  }
}

const HomeStack = createStackNavigator({ Home });
const SalesStack = createStackNavigator({ Sales });
const SettingsStack = createStackNavigator({ Settings });

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarLabel: "Inicio",
      }),
    },
    Sales: {
      screen: SalesStack,
      navigationOptions: () => ({
        tabBarLabel: "Ventas",
      }),
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: () => ({
        tabBarLabel: "Opciones",
      }),
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "chart-areaspline";
        } else if (routeName === "Sales") {
          iconName = "hamburger";
        } else if (routeName === "Settings") {
          iconName = "settings";
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
  createSwitchNavigator(
    {
      AuthLoading: UserValidator,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);

export default App;
