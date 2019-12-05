import React, { PureComponent } from "react";
import { createAppContainer, createSwitchNavigator, SafeAreaView } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import firebase from "./src/firebase";
import Home from "./src/views/Home";
import LogIn from "./src/views/LogIn";
import SignUp from "./src/views/SignUp";
import UserValidator from "./src/components/UserValidator";

class App extends PureComponent {
  render() {
    return <Application />;
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

const drawerContent = props => (
  <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
    <View style={styles.drawerHeaderView}>
      <View style={styles.avatarView}>
        <Avatar rounded title="E" />
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>
          {firebase.auth().currentUser ? firebase.auth().currentUser.displayName : "Nombre"}
        </Text>
      </View>
    </View>
    <ScrollView>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: "Pedir un vehículo",
        drawerIcon: <Icon name="directions-car" color="#616161" />,
      }),
    },
  },
  {
    contentComponent: drawerContent,
  }
);

const AuthStack = createStackNavigator({
  LogIn: {
    screen: LogIn,
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
