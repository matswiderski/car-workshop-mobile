import { View } from "react-native";
import ServiceList from "./ServiceList";
function Services({
  services,
  setServices,
  chosenServices,
  setChosenServices,
}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 250,
        marginTop: 15,
      }}
    >
      <ServiceList
        title="Services"
        services={services}
        setServices={setServices}
        chosenServices={chosenServices}
        setChosenServices={setChosenServices}
        icon="chevron-forward"
        left={true}
      />
      <ServiceList
        title="Chosen services"
        services={services}
        setServices={setServices}
        chosenServices={chosenServices}
        setChosenServices={setChosenServices}
        icon="chevron-back"
        left={false}
      />
    </View>
  );
}

export default Services;
