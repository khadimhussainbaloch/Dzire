import React from "react";
import { AsyncStorage, View, ActivityIndicator, NetInfo } from "react-native";
import { MyDrawerContainer } from "./Navigation/Index";
import Login from "./Screens/Login";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Slider from "./Screens/Slider";
import SkipAd from "./Screens/SkipAd";

let user,
  data,
  lang,
  _isMounted = false;
class IndexScreen extends React.Component {
  state = {
    loggedIn: false
  };

  //abortController = new AbortController();

  _getDataAsync = async () => {
    let language = await AsyncStorage.getItem("lang");
    let d = JSON.parse(language);
    if (!d) {
      await AsyncStorage.setItem("lang", JSON.stringify("en"));
      lang = "en";
    } else {
      lang = d;
    }
    try {
      data = await AsyncStorage.getItem("signedInUser");
      if (data) {
        user = JSON.parse(data);
        this.props.navigation.navigate("MyDrawerContainer");
        this.setState({ loggedIn: true });
      } else {
        this.props.navigation.navigate("Login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    _isMounted = true;
    _isMounted && this._getDataAsync();
  }

  componentWillUnmount() {
    _isMounted = false;
    // this.abortController.abort();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#5c327e" size={40} />
      </View>
    );
  }
}

const AppNavigator = createSwitchNavigator({
  IndexScreen,
  Login,
  MyDrawerContainer
});

const Navigator = createSwitchNavigator({
  Slider,
  SkipAd,
  AppNavigator
});

const Index = createAppContainer(AppNavigator);
const AppContainer = createAppContainer(Navigator);

export { Index, user, AppContainer, lang };
