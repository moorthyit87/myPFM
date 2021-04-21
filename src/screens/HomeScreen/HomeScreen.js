import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import styles from "./styles";
import { firebase, Avatar } from "../../firebase/config";
import { default as UUID } from "node-uuid";
import { CustomDialog, useDialog } from "react-st-modal";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BottomTabs from "../FooterMenu";


//import FooterMenu from "../FooterMenu";

const HomeScreen = ({ navigation, route }) => {
  const [entityText, setEntityText] = useState("");
  const [entities, setEntities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const entityRef = firebase.firestore().collection("entities");
  const userObj = route.params?.user; //route.params?.user[0];
  const [modalShow, setModalShow] = React.useState(false);
  //alert(JSON.stringify(userObj.id));
  let userID = 1;
  if (userObj != null && userObj != undefined && userObj["id"] != null) {
    userID = userObj.id;
  }
  //alert(userID);
  //componentWillMount() {
  //};
  useEffect(() => {
    getAllrecords();
  }, []);

  const getAllrecords = () => {
    entityRef
      .where("authorID", "==", 1)
      //.orderBy("authorID","createdAt")
      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            //entity.id = doc.Id
            newEntities.push({
              docId: doc.id,
              id: entity.id,
              prodName: entity.prodName,
              prodDesc: entity.prodDesc,
              totalCost: entity.totalCost,
              totalTerms: entity.totalTerms,
              totalYear: entity.totalYear,
              termsPerYear: entity.termsPerYear,
              completedTerms: entity.completedTerms,
              spendAmount: entity.spendAmount,
              lastspendAmount: entity.lastspendAmount,
              hasTaken: entity.hasTaken,
            });
          });
          console.log("newEntities" + JSON.stringify(newEntities));
          setEntities(
            newEntities.sort(function (a, b) {
              return b.createdAt - a.createdAt;
            })
          );
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const onAddButtonPress = () => {
    let id = UUID.v4();
    if (entityText && entityText.length > 0) {
      //alert(1);
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
        id: id,
      };
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityText("");
          //alert(newEntities);
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  const deleteRecords = (item) => {
    if (
      item != null &&
      item != undefined &&
      item["id"] != null &&
      item["id"] != undefined
    ) {
      entityRef
        .where("id", "==", item.id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
    } else {
      entityRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
    }
    getAllrecords();
  };
  const updateData = (item) => {
    entityRef.doc(item.docId).update({
      text:
        +"zkoder new Tut#1,zkoder new Tut#1,zkoder new Tut#1,zkoder new Tut#1,zkoder new Tut#1" +
        "zkoder new Tut#1, zkoder new Tut#1, zkoder new Tut#1, moorthy",
    });
  };
  const navigateToAddScreen = () => {
    navigation.navigate("Add", { params: "Jane" });
  };
  const createTwoButtonAlert = (item) =>
    Alert.alert("Delete", "Are you sure want to delete?", [
      {
        text: "Cancel",
        onPress: () => updateData(item),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteRecords(item) },
    ]);
  
  const __getDescriptionStyle = (item) => {
    if (item % 2 == 1) {
      return;
      ("#808080");
    } else {
      return;
      ("#6A5ACD");
    }
  };
  const renderEntity = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const textColor = item.id === selectedId ? "white" : "black";
    return (
      <View style={[styles.card, { borderColor: "orange" }]}>
        {/* <ActivityIndicator size="large" color="#004B4B" /> */}
        <View style={{ width: "80%" }}>
          <TouchableOpacity
            style={{ borderColor: "#DDA0DD" }}
            onPress={() => actionOnRow(item)} //actionOnRow
          >
            {/* <Image
                style={styles.image}
                source={{ uri: __getCompletedIcon(index) }}
              /> */}
            <View style={styles.cardContent}>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  Prod Name:
                </Text>{" "}
                {item.prodName}
              </Text>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  Prod Desc:
                </Text>{" "}
                {item.prodDesc}
              </Text>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  Total Cost:{" "}
                </Text>
                {item.totalCost}{" "}
              </Text>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  Total Terms:{" "}
                </Text>
                {item.totalTerms}{" "}
              </Text>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  Total Year:{" "}
                </Text>
                {item.totalYear}{" "}
              </Text>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  TermsPerYear:{" "}
                </Text>
                {item.termsPerYear}{" "}
              </Text>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  Completed Terms:{" "}
                </Text>
                {item.completedTerms}{" "}
              </Text>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  Amount Spend:{" "}
                </Text>
                {item.spendAmount}{" "}
              </Text>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  Last Amount:{" "}
                </Text>
                {item.lastspendAmount}{" "}
              </Text>
              <Text style={styles.content}>
                <Text style={[styles.description, __getDescriptionStyle(item)]}>
                  Has Taken:{" "}
                </Text>
                {item.hasTaken}{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 0, width: "20%" }}>
          <TouchableOpacity
            style={styles.buttondel}
            onPress={() => createTwoButtonAlert(item)}
          >
            <Text style={styles.buttonText}>Del</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const actionOnRow = (item) => {
    //alert(item);
    navigation.navigate("DetailsScreen");
    //console.log('Selected Item :',item);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add new entity"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEntityText(text)}
            value={entityText}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View> */}
      <View style={{ flex: 6, backgroundColor: "#eeeeee" }}>
        <SafeAreaView style={styles.listContainer}>
          {/* <ScrollView style={styles.scrollView}> */}
          {entities && (
            // <View style={styles.listContainer}>
            <FlatList
              //numColumns={3}
              data={entities}
              style={styles.tasks}
              renderItem={renderEntity}
              keyExtractor={(item) => item.id}
              removeClippedSubviews={true}
            />

            // </View>
          )}
          {/* </ScrollView> */}
        </SafeAreaView>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignContent: "space-between",
          alignItems: "center",
          backgroundColor: "#dedede",
          height:  30,
        }}
      >
        <TouchableOpacity
          onFocus={() => this.setState({ bgColor: "red" })}
          onBlur={() => this.setState({ bgColor: "gray" })}
          style={styles.button_delete}
          onPress={navigateToAddScreen}
        >
          <Text style={styles.buttonText}>Add New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onFocus={() => this.setState({ bgColor: "red" })}
          onBlur={() => this.setState({ bgColor: "gray" })}
          style={styles.button_delete}
          onPress={createTwoButtonAlert}
        >
          <Text style={styles.buttonText}>Delete All</Text>
        </TouchableOpacity>
      </View>
      {/* <BottomTabs /> */}
    </View>
  );
};
export default HomeScreen;
