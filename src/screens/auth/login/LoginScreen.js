import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";
import LoginForm from "./LoginForm";
function LoginScreen() {
  return (
    <View style={styles.loginStyle}>
      <View style={styles.header}>
        <Avatar.Icon size={48} icon="lock-outline" color="black"/>
        <Text style={styles.headerText}>Sign In</Text>
      </View>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  loginStyle: {
    padding: 15,
    justifyContent: "center",
    flex: 1
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  headerText: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 8
  },
});

export default LoginScreen;
