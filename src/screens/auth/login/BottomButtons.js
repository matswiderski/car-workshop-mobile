import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function BottomButtons() {
  const navigation = useNavigation();
  return (
    <View style={styles.bottomButtons}>
      <View>
        <Button
          mode="text"
          uppercase={false}
          onPress={() => navigation.navigate("Register")}
        >
          Don't have an account? Sign Up
        </Button>
      </View>
      <View>
        <Button
          mode="text"
          style={styles.button}
          uppercase={false}
          onPress={() => {}}
        >
          Forgot password?
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButtons: {
    marginTop: 15,
    alignItems: "flex-start",
  },
});

export default BottomButtons;
