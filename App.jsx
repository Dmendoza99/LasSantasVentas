import React, { PureComponent } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet } from "react-native";
import { ThemeProvider, Icon } from "react-native-elements";
import Home from "./src/views/Home";
import Login from "./src/views/Login";
import SignUp from "./src/views/SignUp";
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

const styles = StyleSheet.create({
  drawerHeaderView: {
    height: "20%",
    flexDirection: "row",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
  },

  headerInfo: {
    flex: 3,
    justifyContent: "center",
  },

  avatarView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },

  avatar: {
    height: 25,
    width: 25,
  },
});

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        tabBarLabel: "Inicio",
      }),
    },
    das: {
      screen: Home,
      navigationOptions: () => ({
        tabBarLabel: "das",
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
          iconName = "hamburger";
        } else if (routeName === "das") {
          iconName = "hamburger";
        }
        return <Icon name={iconName} type="material-community" size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: theme.colors.secondary,
      inactiveTintColor: theme.colors.grey1,
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
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
  initialRouteName: "SignUp",
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
