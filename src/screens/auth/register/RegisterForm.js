import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SegmentedButtons } from "react-native-paper";
import { useNotify } from "../../../context/NotifyContext";
import { useAxios } from "../../../api/axios";
function RegisterForm() {
  const navigation = useNavigation();
  const { authInstance } = useAxios();
  const { notification, setNotification } = useNotify();
  const [registerInput, setRegisterInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accountType, setAccountType] = useState("personal");
  const [dataLoading, setDataLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [registerErrors, setRegisterErrors] = useState({
    emailAddress: [],
    password: [],
    confirmPassword: [],
    accountType: [],
  });
  const handleSubmit = async () => {
    setDataLoading(true);
    setRegisterErrors({
      emailAddress: [],
      password: [],
      confirmPassword: [],
      accountType: [],
    });
    setDataLoading(true);
    const signupFormData = {
      emailAddress: registerInput.email,
      password: registerInput.password,
      confirmPassword: registerInput.confirmPassword,
      accountType: accountType,
    };
    try {
      const response = await authInstance({
        method: "post",
        url: "auth/signup",
        data: signupFormData,
        headers: { "Content-Type": "application/json" },
      });
      setNotification({
        visible: true,
        message:
          "Please confirm your email address to complete registration process",
      });
      navigation.navigate("Login");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors !== undefined) {
        if (errors.hasOwnProperty("EmailAddress")) {
          setRegisterErrors({
            emailAddress: error.response.data.errors.EmailAddress,
            password: registerErrors.password,
            confirmPassword: registerErrors.confirmPassword,
            accountType: registerErrors.accountType,
          });
        }
        if (errors.hasOwnProperty("Password")) {
          setRegisterErrors({
            emailAddress: registerErrors.emailAddress,
            password: error.response.data.errors.Password,
            confirmPassword: registerErrors.confirmPassword,
            accountType: registerErrors.accountType,
          });
        }
        if (errors.hasOwnProperty("ConfirmPassword")) {
          setRegisterErrors({
            emailAddress: registerErrors.emailAddress,
            password: registerErrors.password,
            confirmPassword: error.response.data.errors.ConfirmPassword,
            accountType: registerErrors.accountType,
          });
        }
        if (errors.hasOwnProperty("AccountType")) {
          setRegisterErrors({
            emailAddress: registerErrors.emailAddress,
            password: registerErrors.password,
            confirmPassword: registerErrors.confirmPassword,
            accountType: error.response.data.errors.AccountType,
          });
        }
      }
    }
    setDataLoading(false);
  };
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
      <HelperText
        type="error"
        visible={registerErrors.emailAddress.length > 0}
        style={styles.helperText}
      >
        {registerErrors.emailAddress?.map((msg) => {
          return msg;
        })}
      </HelperText>
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
      <HelperText
        type="error"
        visible={registerErrors.password.length > 0}
        style={styles.helperText}
      >
        {registerErrors.password?.map((msg) => {
          return msg;
        })}
      </HelperText>
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
      <HelperText
        type="error"
        visible={registerErrors.confirmPassword.length > 0}
        style={styles.helperText}
      >
        {registerErrors.confirmPassword?.map((msg) => {
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
              style: styles.segmentButton,
            },
          ]}
        />
      </View>
      <HelperText
        type="error"
        visible={registerErrors.accountType.length > 0}
        style={styles.helperText}
      >
        {registerErrors.accountType?.map((msg) => {
          return msg;
        })}
      </HelperText>
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
    marginTop: 3,
    alignItems: "flex-start",
  },
  segment: {
    marginTop: 10,
  },
  segmentButton: {
    fontSize: 400,
  },
  helperText: {
    marginBottom: 10,
  },
});

export default RegisterForm;
