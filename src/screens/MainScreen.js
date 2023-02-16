import React from "react";
import GlobalStyles from "../styles/GlobalStyles";
import Layout from "../components/Layout";
import { SafeAreaView } from "react-native-safe-area-context";

function MainScreen() {
  return (
    <>
      <SafeAreaView style={GlobalStyles.androidSafeArea}>
      </SafeAreaView>
      <Layout />
    </>
  );
}

export default MainScreen;
