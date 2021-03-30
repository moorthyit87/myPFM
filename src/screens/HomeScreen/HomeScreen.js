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
} from "react-native";
import { ListItem } from "react-native-elements";
import styles from "./styles";
import { firebase, Avatar } from "../../firebase/config";
import { default as UUID } from "node-uuid";
import { CustomDialog, useDialog } from "react-st-modal";
import { Modal, Portal, Button, Provider } from "react-native-paper";

//const HomeScreen = ({route,navigation})  => {
export default function HomeScreen({ navigation, route }) {
  const [entityText, setEntityText] = useState("");
  const [entities, setEntities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const entityRef = firebase.firestore().collection("entities");
  const userObj = route.params?.user[0];
  const [modalShow, setModalShow] = React.useState(false);
  //alert(JSON.stringify(userObj.id));
  let userID = userObj.id;
  //alert(userID);
  //componentWillMount() {
  let id = UUID.v4();
  //};
  useEffect(() => {
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
              id: entity.id,
              text: entity.text,
            });
          });
          console.log("newEntities" + JSON.stringify(newEntities));
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onAddButtonPress = () => {
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
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  handleSelection = (id) => {
    // alert(id);
  };
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

      <TouchableOpacity style={[textColor]} onPress={() => actionOnRow(item)}>
        <View style={styles.entityContainer}>
          {/* <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text> */}
          <Text>{item.text} </Text>
          <Text style={{ color: "red" }}>
            {index}.{item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const actionOnRow = (item) => {
    alert(item);
    //console.log('Selected Item :',item);
  };

  const list = [
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
    },
  ];
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
       </View>
  );
}
//export default HomeScreen

//export default HomeScreen
