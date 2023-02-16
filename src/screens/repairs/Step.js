import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
function Step({ step, currentStep, text }) {
  const dynamicTextStyle = (step) => {
    return {
      color: step === currentStep ? "white" : "#898989",
      fontWeight: "500",
      marginHorizontal: 10,
    };
  };
  return (
    <View style={styles.step}>
      {currentStep > step ? (
        <Avatar.Icon
          size={24}
          icon="check"
          style={{ backgroundColor: "#ff6384" }}
        />
      ) : (
        <Avatar.Text
          size={24}
          label={step}
          style={{
            backgroundColor: currentStep === step ? "#ff6384" : "#898989",
          }}
        />
      )}
      <Text style={dynamicTextStyle(step)}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  step: {
    display: "flex",
    flexDirection: "row",
  },
});
export default Step;
