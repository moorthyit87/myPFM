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

export default function AddScreen({ navigation, route }) {
  const navData = route.params; //route.params?.user[0];
  let objData = null;
  let navtype = "_Add";
  if (navData != null && navData["data"] != null) {
    navtype = "_Edit";
    objData = navData["data"];
    //alert(JSON.stringify(navData["data"]));
  }
  //alert(navtype);
  const [prodName, setProdName] =
    navtype == "_Add" ? useState("") : useState(objData["prodName"]);
  const [prodDesc, setProdDesc] =
    navtype == "_Add" ? useState("") : useState(objData["prodDesc"]);
  const [totalCost, settotalCost] =
    navtype == "_Add" ? useState("") : useState(objData["totalCost"]);
  const [totalTerms, settotalTerms] =
    navtype == "_Add" ? useState("") : useState(objData["totalTerms"]);
  const [totalYear, settotalYear] =
    navtype == "_Add" ? useState("") : useState(objData["totalYear"]);
  const [termsPerYear, settermsPerYear] =
    navtype == "_Add" ? useState("") : useState(objData["termsPerYear"]);
  const [completedTerms, setcompletedTerms] =
    navtype == "_Add" ? useState("") : useState(objData["completedTerms"]);
  const [spendAmount, setspendAmount] =
    navtype == "_Add" ? useState("") : useState(objData["spendAmount"]);
  const [lastspendAmount, setlastspendAmount] =
    navtype == "_Add" ? useState("") : useState(objData["lastspendAmount"]);
  const [hasTaken, setHasTaken] =
    navtype == "_Add" ? useState("") : useState(objData["hasTaken"]);

  //const [prodName1, setProdName1] = useState(objData["prodName"]);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    let id = UUID.v4();
    //alert(1);
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    if (navtype == "_Add") {
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
          setProdName('');
          setProdDesc('');
          settotalCost('');
          settotalTerms('');
          settotalYear('');
          settermsPerYear('');
          setcompletedTerms('');
          setspendAmount('');
          setlastspendAmount('');
          setHasTaken();


        })
        .catch((error) => {
          alert(error);
        });
    } else {
      entityRef.doc(objData.docId).update({
        prodName: objData.prodName,
        prodDesc: objData.prodDesc,
        totalCost: objData.totalCost,
        totalTerms: objData.totalTerms,
        totalYear: objData.totalYear,
        termsPerYear: objData.termsPerYear,
        completedTerms: objData.completedTerms,
        spendAmount: objData.spendAmount,
        hasTaken: objData.hasTaken,
        authorID: 1,
      });
      navigation.navigate("Home2");
    }
  };

  const actionOnRow = (item) => {
    alert(item);
  };
  const clickEventListener = () => {
    //alert(1);
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <View
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => {
            clickEventListener();
          }}
        >
          <MaterialCommunityIcons
            name="menu"
            color="white"
            size={30}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              marginLeft: 15,
              alignItems: "center",
              marginTop: 12,
            }}
          />
        </TouchableOpacity>
      </View>
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
          value={navtype == "_Add" ? prodName : prodName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Product Description"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setProdDesc(text)}
          value={navtype == "_Add" ? prodDesc : prodDesc}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Total Cost"
          onChangeText={(text) => settotalCost(text)}
          value={navtype == "_Add" ? totalCost : totalCost}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Total Members"
          keyboardType="numeric"
          onChangeText={(text) => settotalTerms(text)}
          value={navtype == "_Add" ? totalTerms : totalTerms}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Total Year"
          onChangeText={(text) => settotalYear(text)}
          value={navtype == "_Add" ? totalYear : totalYear}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Terms per Year"
          onChangeText={(text) => settermsPerYear(text)}
          value={navtype == "_Add" ? termsPerYear : termsPerYear}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Completed Terms"
          onChangeText={(text) => setcompletedTerms(text)}
          value={navtype == "_Add" ? completedTerms : completedTerms}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="numeric"
          placeholder="Amout Spend till.."
          onChangeText={(text) => setspendAmount(text)}
          value={navtype == "_Add" ? spendAmount : spendAmount}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Last Spend till.."
          onChangeText={(text) => setlastspendAmount(text)}
          value={navtype == "_Add" ? lastspendAmount : lastspendAmount}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Has Taken"
          onChangeText={(text) => setHasTaken(text)}
          value={navtype == "_Add" ? hasTaken : hasTaken}
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
