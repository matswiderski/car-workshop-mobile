import React from "react";
import { Button, Avatar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useAuth } from "../context/AuthContext";
function Profile() {
  const { logout, user } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 15,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Avatar.Text
          size={64}
          label={user.charAt(0).toUpperCase()}
          style={{ backgroundColor: "#FF5722" }}
        />
      </View>
      <View>
        <Button
          onPress={handleLogout}
          buttonColor="#ff6384"
          mode="elevated"
          uppercase
          textColor="black"
          style={styles.button}
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
  },
});
export default Profile;
