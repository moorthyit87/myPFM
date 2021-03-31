import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./LoginScreen/LoginScreen";
import HomeScreen from "./HomeScreen/HomeScreen";
import DetailsScreen from "./DetailsScreen/DetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
const HomeNavigation1 = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
const BottomTabs = ({}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen name="Login" component={HomeNavigation} />
        <Tab.Screen name="Home1" component={HomeNavigation1} />
        <Tab.Screen name="Home2" component={HomeNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
