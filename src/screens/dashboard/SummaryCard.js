import { View, Text } from "react-native";
import { Avatar } from "react-native-paper";
Avatar;
function SummaryCard({ icon, backgroundColor, value, text, font }) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `#${backgroundColor}`,
        margin: 10,
        borderRadius: 8,
      }}
    >
      <Avatar.Icon
        icon={icon}
        size={48}
        style={{
          marginBottom: 15,
          marginTop: 10,
          backgroundColor: `#${backgroundColor}`,
        }}
        color={`#${font}`}
      />
      <Text style={{ color: `#${font}`, fontSize: 30 }}>{value}</Text>
      <Text style={{ color: `#${font}`, fontSize: 15, marginBottom: 15 }}>
        {text}
      </Text>
    </View>
  );
}

export default SummaryCard;
