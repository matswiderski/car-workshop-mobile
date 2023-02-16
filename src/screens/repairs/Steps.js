import React from "react";
import Step from "./Step";
import StepLine from "./StepLine";
import { Button } from "react-native-paper";
import { View } from "react-native";

function Steps({ currentStep, openModal }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
      }}
    >
      <View>
        <Step step={1} currentStep={currentStep} text="Selected car" />
        <StepLine />
        <Step step={2} currentStep={currentStep} text="Chose workshop" />
        <StepLine />
        <Step step={3} currentStep={currentStep} text="Provide details" />
      </View>
      <View>
        <Button
          mode="contained"
          buttonColor="rgba(255, 97, 131, 0.15)"
          textColor="#aaaaaa"
          onPress={openModal}
        >
          History
        </Button>
      </View>
    </View>
  );
}

export default Steps;
