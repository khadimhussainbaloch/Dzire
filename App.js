import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { AppContainer } from "./Index";

export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
