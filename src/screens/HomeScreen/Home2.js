import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import DetailsScreen from ".././DetailsScreen/DetailsScreen";
import ProfileScreen from ".././DetailsScreen/DetailsScreen";
import SettingsScreen from ".././DetailsScreen/DetailsScreen";
import AddScreen from ".././AddScreen/AddScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createAppContainer } from "react-navigation"; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default class Home2 extends Component {
  constructor(props) {
    super(props);
    const navigationObj = props.navigation;
    const state = props.route.params;
    //console.log("PROPS " + state.user);
    this.state = {
      data: [
        {
          id: 1,
          title: "You",
          color: "#FF4500",
          members: 8,
          image: "https://img.icons8.com/color/70/000000/name.png",
        },
        {
          id: 1,
          title: "Home",
          color: "#87CEEB",
          members: 6,
          image: "https://img.icons8.com/office/70/000000/home-page.png",
        },
        {
          id: 2,
          title: "Love",
          color: "#4682B4",
          members: 12,
          image: "https://img.icons8.com/color/70/000000/two-hearts.png",
        },
        {
          id: 3,
          title: "Family",
          color: "#6A5ACD",
          members: 5,
          image: "https://img.icons8.com/color/70/000000/family.png",
        },
        {
          id: 4,
          title: "Friends",
          color: "#FF69B4",
          members: 6,
          image: "https://img.icons8.com/color/70/000000/groups.png",
        },
        {
          id: 5,
          title: "School",
          color: "#00BFFF",
          members: 7,
          image: "https://img.icons8.com/color/70/000000/classroom.png",
        },
        {
          id: 6,
          title: "Things",
          color: "#00FFFF",
          members: 8,
          image: "https://img.icons8.com/dusk/70/000000/checklist.png",
        },
        {
          id: 8,
          title: "World",
          color: "#20B2AA",
          members: 23,
          image: "https://img.icons8.com/dusk/70/000000/globe-earth.png",
        },
        {
          id: 9,
          title: "Remember",
          color: "#191970",
          members: 45,
          image: "https://img.icons8.com/color/70/000000/to-do.png",
        },
        {
          id: 9,
          title: "Game",
          color: "#008080",
          members: 13,
          image: "https://img.icons8.com/color/70/000000/basketball.png",
        },
      ],
    };
  }

  clickEventListener(item) {
    //Alert.alert(item.title);
    this.props.navigation.navigate("Home", {
      user: this.props.route.params.user,
    });
  }
  AddStack() {
    return (
      <Stack.Navigator
        initialRouteName="Add"
        screenOptions={{
          headerStyle: { backgroundColor: "#42f44b" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{ title: "Home Page" }}
        />
      </Stack.Navigator>
    );
  }

  HomeStack() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#42f44b" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home Page" }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{ title: "Home Page" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Details Page" }}
        />
      </Stack.Navigator>
    );
  }

  SettingsStack() {
    return (
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: { backgroundColor: "#42f44b" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Setting Page" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Details Page" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile Page" }}
        />
      </Stack.Navigator>
    );
  }
  render() {
    return (
      // <View style={styles.container}>
      //   <FlatList
      //     style={styles.list}
      //     contentContainerStyle={styles.listContainer}
      //     data={this.state.data}
      //     horizontal={false}
      //     numColumns={2}
      //     keyExtractor={(item) => {
      //       return item.id;
      //     }}
      //     renderItem={({ item }) => {
      //       return (
      //         <TouchableOpacity
      //           style={[styles.card, { backgroundColor: item.color }]}
      //           onPress={() => {
      //             this.clickEventListener(item);
      //           }}
      //         >
      //           <View style={styles.cardHeader}>
      //             <Text style={styles.title}>{item.title}</Text>
      //             <Image
      //               style={styles.icon}
      //               source={{
      //                 uri: "https://img.icons8.com/ios/40/000000/settings.png",
      //               }}
      //             />
      //           </View>
      //           <Image style={styles.cardImage} source={{ uri: item.image }} />
      //           <View style={styles.cardFooter}>
      //             <Text style={styles.subTitle}>{item.members} members</Text>
      //           </View>
      //         </TouchableOpacity>
      //       );
      //     }}
      //   />
      // </View>
      // <NavigationContainer>
      //   <Drawer.Navigator initialRouteName="Home">
      //     <Drawer.Screen name="HomeStack" component={this.HomeStack} />
      //     <Drawer.Screen name="SettingsStack" component={this.SettingsStack} />
      //   </Drawer.Navigator>
      // </NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          style: {
            backgroundColor: "black",
            paddingBottom: 10,
            paddingVertical: 10,
            height: 60,
          },
          activeTintColor: "#42f44b",
          backgroundColor: "black",
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={this.HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              // <Icon name="menu" size={20} color="black" />
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="AddStack"
          component={this.AddStack}
          options={{
            tabBarLabel: "ADD",
            tabBarIcon: ({ color, size }) => (
              // <Icon name="circle" size={size} color={ color} />
              <MaterialCommunityIcons
                name="account-plus"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={this.SettingsStack}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="buffer" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor: "#E6E6E6",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexBasis: "48%",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    color: "#FFFFFF",
  },
  icon: {
    height: 20,
    width: 20,
  },
});
