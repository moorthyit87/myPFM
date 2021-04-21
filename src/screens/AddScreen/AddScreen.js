import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { default as UUID } from "node-uuid";
const usrRef = firebase.firestore().collection("users");
const entityRef = firebase.firestore().collection("entities");
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function AddScreen({ navigation }) {
  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [totalCost, settotalCost] = useState("");
  const [totalTerms, settotalTerms] = useState("");
  const [totalYear, settotalYear] = useState("");
  const [termsPerYear, settermsPerYear] = useState("");
  const [completedTerms, setcompletedTerms] = useState("");
  const [spendAmount, setspendAmount] = useState("");
  const [lastspendAmount, setlastspendAmount] = useState("");
  const [hasTaken, setHasTaken] = useState("");
  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    let id = UUID.v4();
    //alert(1);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      prodName: prodName,
      prodDesc: prodDesc,
      totalCost: totalCost,
      totalTerms: totalTerms,
      totalYear: totalYear,
      termsPerYear: termsPerYear,
      completedTerms: completedTerms,
      spendAmount: spendAmount,
      hasTaken: hasTaken,
      authorID: 1,
      createdAt: timestamp,
      id: id,
    };
    entityRef
      .add(data)
      .then((_doc) => {
        //setEntityText("");
        alert("Success");
        //Keyboard.dismiss();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const actionOnRow = (item) => {
    alert(item);
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
          placeholder="Enter the Product"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setProdName(text)}
          value={prodName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Product Description"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setProdDesc(text)}
          value={prodDesc}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Total Cost"
          onChangeText={(text) => settotalCost(text)}
          value={totalCost}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Total Members"
          keyboardType="numeric"
          onChangeText={(text) => settotalTerms(text)}
          value={totalTerms}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Total Year"
          onChangeText={(text) => settotalYear(text)}
          value={totalYear}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Terms per Year"
          onChangeText={(text) => settermsPerYear(text)}
          value={termsPerYear}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Completed Terms"
          onChangeText={(text) => setcompletedTerms(text)}
          value={completedTerms}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Amout Spend till.."
          onChangeText={(text) => setspendAmount(text)}
          value={spendAmount}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Last Spend till.."
          onChangeText={(text) => setlastspendAmount(text)}
          value={lastspendAmount}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Has Taken"
          onChangeText={(text) => setHasTaken(text)}
          value={hasTaken}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {/* <DropDownPicker
          items={[
            {
              label: "USA",
              value: "usa",
              icon: () => <Icon name="flag" size={18} color="#900" />,
              hidden: true,
            },
            {
              label: "UK",
              value: "uk",
              icon: () => <Icon name="flag" size={18} color="#900" />,
            },
            {
              label: "France",
              value: "france",
              icon: () => <Icon name="flag" size={18} color="#900" />,
            },
          ]}
          defaultValue={"usa"}
          containerStyle={{ height: 50 }}
          style={{ marginLeft: 26, width: "86%", backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ height: 50,          backgroundColor: "#fafafa" }}
          onChangeItem={(item) => actionOnRow(item.value)}
          dropDownMaxHeight={240}
        /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Submit</Text>
        </TouchableOpacity>
        {/* <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View> */}
      </KeyboardAwareScrollView>
    </View>
  );
}
