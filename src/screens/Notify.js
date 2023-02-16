import { View } from "react-native";
import { Snackbar, Button, Text, Avatar } from "react-native-paper";
import { useNotify } from "../context/NotifyContext";

function Notify() {
  const { notification, setNotification } = useNotify();
  const onDismissSnackBar = () =>
    setNotification({ visible: false, message: "" });

  return (
    <Snackbar
      visible={notification.visible}
      onDismiss={onDismissSnackBar}
      style={{
        backgroundColor: "#4E9A51",
        position: "absolute",
        bottom: 50,
      }}
      action={{
        textColor: "white",
        icon: "close",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar.Icon
          size={28}
          icon="check-circle-outline"
          style={{ backgroundColor: "#4E9A51" }}
        />
        <Text>{notification.message}</Text>
      </View>
    </Snackbar>
  );
}
export default Notify;
