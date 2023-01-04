import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SegmentedButtons } from "react-native-paper";

function RegisterForm() {
  const navigation = useNavigation();
  const [registerInput, setRegisterInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accountType, setAccountType] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  function handleSubmit() {
    console.log(loginInput);
    setDataLoading(true);
  }
  return (
    <View>
      <TextInput
        label="Email address *"
        onChangeText={(value) =>
          setRegisterInput({
            email: value,
            password: registerInput.password,
            confirmPassword: registerInput.confirmPassword,
          })
        }
        style={styles.loginInputs}
        mode="flat"
      />
      <TextInput
        label="Password *"
        secureTextEntry={showPassword}
        onChangeText={(value) =>
          setRegisterInput({
            email: registerInput.email,
            password: value,
            confirmPassword: registerInput.confirmPassword,
          })
        }
        style={styles.loginInputs}
        textColor="white"
        mode="flat"
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => {
              setShowPassword(showPassword ? false : true);
            }}
          />
        }
      />
      <TextInput
        label="Confirm password *"
        secureTextEntry={showConfirmPassword}
        onChangeText={(value) =>
          setRegisterInput({
            email: registerInput.email,
            password: registerInput.password,
            confirmPassword: value,
          })
        }
        style={styles.loginInputs}
        textColor="white"
        mode="flat"
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => {
              setShowConfirmPassword(showConfirmPassword ? false : true);
            }}
          />
        }
      />
      <HelperText type="error" visible={false}>
        Email address is invalid!
      </HelperText>
      <Button
        onPress={handleSubmit}
        loading={dataLoading}
        buttonColor="#ff6384"
        mode="outlined"
        uppercase
        textColor="black"
        style={styles.signInButton}
      >
        Sign Up
      </Button>
      <View style={styles.segment}>
        <SegmentedButtons
          value={accountType}
          onValueChange={setAccountType}
          buttons={[
            {
              value: "personal",
              label: "PERSONAL ACCOUNT",
              icon: "account",
            },
            {
              value: "business",
              label: "BUSINESS ACCOUNT",
              icon: "briefcase-variant",
              style: styles.segmentButton
            },
          ]}
        />
      </View>
      <View style={styles.bottomButton}>
        <Button
          mode="text"
          uppercase={false}
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account? Sign in instead
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signInButton: {
    borderRadius: 4,
  },
  loginInputs: {
    marginBottom: 20,
  },
  bottomButton: {
    marginTop: 8,
    alignItems: "flex-start",
  },
  segment: {
    marginTop: 20,
  },
  segmentButton: {
    fontSize: 400
  },
});

export default RegisterForm;
