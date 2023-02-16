import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

function ServiceList({
  title,
  services,
  setServices,
  chosenServices,
  setChosenServices,
  left,
  icon,
}) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [chosenSelectedServices, setChosenSelectedServices] = useState([]);
  return (
    <View style={{ justifyContent: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#1E1E1E",
          padding: 10,
        }}
      >
        <Checkbox
          color="#ff6384"
          status={
            (
              left
                ? selectedServices.length > 0
                : chosenSelectedServices.length > 0
            )
              ? "checked"
              : "unchecked"
          }
          onPress={() => {
            if (left)
              setSelectedServices(
                selectedServices.length === 0 ? services.map((row) => row) : []
              );
            else {
              setChosenSelectedServices(
                chosenSelectedServices.length === 0
                  ? chosenServices.map((row) => row)
                  : []
              );
            }
          }}
        />
        <View>
          <Text style={{ color: "white", fontWeight: "700", fontSize: 15 }}>
            {title}
          </Text>
          <Text style={{ color: "white" }}>
            {left
              ? `${selectedServices.length}/${services.length} seleceted`
              : `${chosenSelectedServices.length}/${chosenServices.length} seleceted`}
          </Text>
        </View>
      </View>
      <FlatList
        data={left ? services : chosenServices}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <View>
                <Checkbox
                  color="#ff6384"
                  status={
                    (
                      left
                        ? selectedServices.includes(item)
                        : chosenSelectedServices.includes(item)
                    )
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    if (left) {
                      setSelectedServices(
                        selectedServices.includes(item)
                          ? selectedServices.filter(
                              (service) => service.id !== item.id
                            )
                          : [...selectedServices, item]
                      );
                    } else {
                      setChosenSelectedServices(
                        chosenSelectedServices.includes(item)
                          ? chosenSelectedServices.filter(
                              (service) => service.id !== item.id
                            )
                          : [...chosenSelectedServices, item]
                      );
                    }
                  }}
                />
              </View>
              <View>
                <Text style={styles.textItem}>{item.name}</Text>
              </View>
            </View>
          );
        }}
      />
      <TouchableHighlight
        style={{
          borderColor: (
            left
              ? selectedServices.length === 0
              : chosenSelectedServices.length === 0
          )
            ? "#1E1E1E"
            : "#ff6384",
          borderWidth: 1,
          borderRadius: 7,
          justifyContent: "center",
          alignItems: "center",
        }}
        disabled={
          left
            ? selectedServices.length === 0
            : chosenSelectedServices.length === 0
        }
        onPress={() => {
          if (left) {
            const newServices = services.filter(
              (service) => !selectedServices.includes(service)
            );
            setServices(newServices);
            const newChosenServices = [...chosenServices, ...selectedServices];
            setChosenServices(newChosenServices);
            setSelectedServices([]);
          } else {
            const newChosenServices = chosenServices.filter(
              (service) => !chosenSelectedServices.includes(service)
            );
            setChosenServices(newChosenServices);
            const newServices = [...services, ...chosenSelectedServices];
            setServices(newServices);
            setChosenSelectedServices([]);
          }
        }}
      >
        <Ionicons
          name={icon}
          size={16}
          color={
            (
              left
                ? selectedServices.length === 0
                : chosenSelectedServices.length === 0
            )
              ? "#1E1E1E"
              : "#ff6384"
          }
          style={{ paddingHorizontal: 20, paddingVertical: 5 }}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  textItem: {
    color: "white",
    paddingVertical: 15,
  },
});

export default ServiceList;
