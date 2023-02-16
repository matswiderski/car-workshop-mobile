import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { List } from "react-native-paper";
function Repairs({ repairs }) {
  return (
    <List.Section>
      <FlatList
        data={repairs}
        renderItem={({ item }) => {
          return (
            <List.Accordion
              title={`${item.car.licensePlate} - ${item.workshop.name}`}
            >
              <List.Item title="Services" titleStyle={{ fontSize: 20 }} />
              <View
                style={{
                  height: 1,
                  backgroundColor: "rgba(255, 255, 255 ,0.3)",
                  alignSelf: "stretch",
                }}
              />
              {item.services.map((service) => {
                return (
                  <View key={service.id}>
                    <List.Item
                      title={service.name}
                      titleStyle={{ fontSize: 13 }}
                    />
                    <List.Item
                      title={`${service.price} $`}
                      titleStyle={{ fontSize: 13 }}
                    />
                    {item.services.length > 1 && (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: "rgba(255, 255, 255 ,0.3)",
                          alignSelf: "stretch",
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </List.Accordion>
          );
        }}
      />
    </List.Section>
  );
}
const styles = StyleSheet.create({
  headerText: {
    color: "white",
  },
});

export default Repairs;
