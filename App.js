import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import DetailsScreen from "./src/screens/DetailsScreen/DetailsScreen";
import { decode, encode } from "base-64";

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

  // useEffect(() => {
  //     usersRef
  //         .where("email", "==", "test@gmail.com")
  //         .orderBy('id')
  //         .onSnapshot(
  //             querySnapshot => {
  //                 const userData = []
  //                 querySnapshot.forEach(doc => {
  //                     const entity = doc.data()
  //                     entity.id = doc.Id
  //                     userData.push(entity);
  //                 });
  //                 //console.log("newEntities" + newEntities);
  //                 setLoading(false)
  //                 setUser(userData)
  //             },
  //             error => {
  //                 console.log(error)
  //             }
  //         )
  // }, [])

  if (loading) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Login">
            {/* {props => <HomeScreen {...props} extraData={user} />} */}
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
