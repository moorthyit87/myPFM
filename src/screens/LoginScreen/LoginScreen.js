import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = firebase.firestore().collection("users");
  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = () => {
    loginRef.where("email", "==", email).onSnapshot(
      (querySnapshot) => {
        const newEntities = [];
        querySnapshot.forEach((doc) => {
          const { email, password, id } = doc.data();
          //entity= doc.Id
          newEntities.push({
            key: doc.id, // Document ID
            email, // DocumentSnapshot
            password,
            id,
          });
        });
        console.log("newEntities" + JSON.stringify(newEntities));
        const userobj = [];
        if (newEntities.length > 0) {
          for (var i = 0; i < newEntities.length; i++) {
            if (
              newEntities[i]["email"] == email &&
              newEntities[i]["password"] == password
            ) {
              userobj.push(newEntities[i]);
              console.log("userobj" + JSON.stringify(userobj));
              navigation.navigate("Home2", { user: userobj });
            } else {
              alert("login failed");
            }
          }
        } else {
          alert("login failed");
        }
        //console.log("newEntities" + newEntities);
        //setEntities(newEntities)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
