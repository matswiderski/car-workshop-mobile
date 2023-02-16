import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";
import RegisterForm from "./RegisterForm";

function RegisterScreen() {
  return (
    <View style={styles.loginStyle}>
      <View style={styles.header}>
        <Avatar.Icon size={48} icon="account-check" color="black" />
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
      <RegisterForm />
    </View>
  );
}

const styles = StyleSheet.create({
  loginStyle: {
    padding: 15,
    justifyContent: "center",
    flex: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 8,
  },
});

export default RegisterScreen;
