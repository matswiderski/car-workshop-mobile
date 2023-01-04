import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import BottomButtons from "./BottomButtons";

function LoginForm() {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [dataLoading, setDataLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  function handleSubmit() {
    console.log(loginInput);
    setDataLoading(true);
  }
  return (
    <View>
      <TextInput
        label="Email *"
        onChangeText={(value) =>
          setLoginInput({ email: value, password: loginInput.password })
        }
        style={styles.loginInputs}
        mode="flat"
      />
      <TextInput
        label="Password *"
        secureTextEntry={showPassword}
        onChangeText={(value) =>
          setLoginInput({ email: loginInput.email, password: value })
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
        Sign In
      </Button>
      <BottomButtons />
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
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LoginForm;
