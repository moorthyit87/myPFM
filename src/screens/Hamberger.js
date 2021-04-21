import { createAppContainer, createDrawerNavigator } from "react-navigation";
import Home from "./HomeScreen/HomeScreen";
import Home2 from "./HomeScreen/Home2";

const HamburgerNavigation = createDrawerNavigator(
  {
    Home: Home,
    DefaultScreen: {
      screen: Home2,
    },
  },
  {
    initialRouteName: "Home2",
  }
);

export default createAppContainer(HamburgerNavigation);
