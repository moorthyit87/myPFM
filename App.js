import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import DetailsScreen from "./src/screens/DetailsScreen/DetailsScreen";
import Home2 from "./src/screens/HomeScreen/Home2";
import Home1 from "./src/screens/HomeScreen/Home1";
import AddScreen from "./src/screens/AddScreen/AddScreen";
import { decode, encode } from "base-64";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ActionBarImage from "./src/screens/ActionBarImage";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  //const usersRef = firebase.firestore().collection('users');
  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const Drawer = createDrawerNavigator();
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     {user ? (
    //       <Stack.Screen name="Login">
    //         {/* {props => <HomeScreen {...props} extraData={user} />} */}
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //       </Stack.Screen>
    //     ) : (
    //       <>
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //         <Stack.Screen name="Home" component={HomeScreen} />
    //         <Stack.Screen name="Registration" component={RegistrationScreen} />
    //         <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    //         <Stack.Screen
    //           name="Home2"
    //           component={Home2}
    //           options={{ headerShown:  false }}
    //         />
    //         <Stack.Screen name="Home1" component={Home1} />
    //         <Stack.Screen name="AddScreen" component={AddScreen} />
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home2">
        <Drawer.Screen name="Home2" component={Home2} />
        <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
