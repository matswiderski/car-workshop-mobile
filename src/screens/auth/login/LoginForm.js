import { useState, useCallback, useRef } from "react";
import { useAxios } from "../../../api/axios";
import { View, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TextInput, Button, HelperText } from "react-native-paper";
import BottomButtons from "./BottomButtons";
import { useAuth } from "../../../context/AuthContext";
import * as SecureStore from "expo-secure-store";
function LoginForm() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigation = useNavigation();
  const [loginInput, setLoginInput] = useState({
    emailAddress: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    emailAddress: [],
    password: [],
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const { setAuthState, setUser } = useAuth();
  const { authInstance } = useAxios();
  useFocusEffect(
    useCallback(() => {
      return () => {
        emailInput.current?.clear();
        passwordInput.current?.clear();
        setLoginInput({
          emailAddress: "",
          password: "",
        });
        setLoginErrors({
          emailAddress: [],
          password: [],
        });
      };
    }, [])
  );

  async function handleSubmit() {
    setLoginErrors({
      emailAddress: [],
      password: [],
    });
    setDataLoading(true);
    try {
      const response = await authInstance({
        method: "post",
        url: "auth/login",
        data: loginInput,
        headers: { "Content-Type": "application/json" },
      });
      setAuthState({
        accessToken: response.data.token,
        refreshToken: response.data.refreshToken,
        authenticated: true,
      });

      await SecureStore.setItemAsync(
        "tokens",
        JSON.stringify({
          accessToken: response.data.token,
          refreshToken: response.data.refreshToken,
        })
      );
      setUser(loginInput.emailAddress);
      await SecureStore.setItemAsync("user", loginInput.emailAddress);
      navigation.navigate("MainScreen");
    } catch (error) {
      setLoginErrors({
        emailAddress:
          error.response.data.errors.EmailAddress === undefined
            ? []
            : error.response.data.errors.EmailAddress,
        password:
          error.response.data.errors.login === undefined
            ? []
            : error.response.data.errors.login,
      });
    }
    setDataLoading(false);
  }
  return (
    <View>
      <TextInput
        label="Email *"
        onChangeText={(value) =>
          setLoginInput({ emailAddress: value, password: loginInput.password })
        }
        error={
          loginErrors.emailAddress.length > 0 || loginErrors.password.length > 0
        }
        mode="flat"
        ref={emailInput}
      />
      <HelperText
        type="error"
        visible={loginErrors.emailAddress.length > 0}
        style={styles.helperText}
      >
        {loginErrors.emailAddress?.map((msg) => {
          return msg;
        })}
      </HelperText>
      <TextInput
        label="Password *"
        secureTextEntry={showPassword}
        onChangeText={(value) =>
          setLoginInput({
            emailAddress: loginInput.emailAddress,
            password: value,
          })
        }
        error={loginErrors.password.length > 0}
        textColor="white"
        mode="flat"
        ref={passwordInput}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => {
              setShowPassword(showPassword ? false : true);
            }}
          />
        }
      />
      <HelperText
        type="error"
        visible={loginErrors.password.length > 0}
        style={styles.helperText}
      >
        {loginErrors.password?.map((msg) => {
          return msg;
        })}
      </HelperText>
      <Button
        onPress={handleSubmit}
        loading={dataLoading}
        disabled={dataLoading}
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
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  helperText: {
    marginBottom: 20,
  },
});

export default LoginForm;
