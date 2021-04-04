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

//const HomeScreen = ({route,navigation})  => {
const HomeScreen = ({ navigation, route }) => {
  const [entityText, setEntityText] = useState("");
  const [entities, setEntities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const entityRef = firebase.firestore().collection("entities");
  const userObj = route.params?.user[0];
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
              text: entity.text,
              createdAt: entity.createdAt,
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

  const onAddButtonPress = () =>
  {
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
  const updateData = (item) =>
  {
    entityRef.doc(item.docId).update({
      text: "zkoder new Tut#1",
    });

  };
const navigateToAddScreen = () => {
  navigation.navigate("AddScreen");
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
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
  const renderEntity = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const textColor = item.id === selectedId ? "white" : "black";

    return (
      //   <Item
      //     item={item}
      //     onPress={() => setSelectedId(item.text)}
      //     backgroundColor={{ backgroundColor }}
      //     textColor={{ color }}
      //   />

      <View style={styles.childContainer}>
        {/* <ActivityIndicator size="large" color="#004B4B" /> */}
        <View style={{ width: "70%" }}>
          <TouchableOpacity
            style={[textColor]}
            onPress={() => actionOnRow(item)} //actionOnRow
          >
            <Text>{item.text} </Text>
            <Text style={{ color: "red" }}>
              {index}.{item.docId}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 30, width: "30%" }}>
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
        <View style={styles.formContainer}>
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
        </View>
        <View style={{ flex: 6, backgroundColor: "white" }}>
          <SafeAreaView style={styles.listContainer}>
            <ScrollView style={styles.scrollView}>
              {entities && (
                // <View style={styles.listContainer}>
                <FlatList
                  //numColumns={3}
                  data={entities}
                  renderItem={renderEntity}
                  keyExtractor={(item) => item.id}
                  removeClippedSubviews={true}
                />

                // </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignContent: "space-between",
            alignItems: "center",
            backgroundColor: "black",
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

//export default HomeScreen
