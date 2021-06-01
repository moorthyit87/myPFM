// 3 Ways to Add Image Icon Inside Navigation Bar in React Native
// https://aboutreact.com/react-native-image-icon-inside-navigation-bar/

import React, { Component } from "react";
import { TouchableOpacity, View, Image } from "react-native";

//const ActionBarImage = ({ navigation }) => {
export default class ActionBarImage extends Component {
  constructor(props) {
    super(props);
  }
  clickEventListener() {
    //alert(1);
    this.props.navigation.openDrawer();
  }
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            this.clickEventListener();
          }}
        >
          <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png",
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40 / 2,
              marginLeft: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//export default ActionBarImage;
