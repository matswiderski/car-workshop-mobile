import { Text, StyleSheet, View, ScrollView } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
} from "victory-native";
import SummaryCard from "./SummaryCard";
const dataBar = [
  { month: "January", money: 2100 },
  { month: "February", money: 0 },
  { month: "March", money: 13000 },
  { month: "April", money: 0 },
  { month: "May", money: 0 },
  { month: "June", money: 1200 },
  { month: "July", money: 150 },
];
const labels = ["January", "February", "March", "April", "May", "June", "July"];

function DashboardScreen() {
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <ScrollView>
        <SummaryCard
          icon="currency-usd"
          value="341515"
          text="Total cost of repairs"
          backgroundColor="E76F51"
          font="743829"
        />
        <SummaryCard
          icon="car"
          value="2"
          text="Registered cars"
          backgroundColor="f4a261"
          font="7a5131"
        />
        <SummaryCard
          icon="wrench"
          value="43"
          text="Repairs in total"
          backgroundColor="e9c46a"
          font="756235"
        />
        <SummaryCard
          icon="calendar-month"
          value="2022-02-29"
          text="Date of last repair"
          backgroundColor="2a9d8f"
          font="154f48"
        />
        <View style={styles.container}>
          <VictoryPie
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 },
            ]}
          />
        </View>
        <View style={styles.container}>
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryBar data={dataBar} x="month" y="money" />
          </VictoryChart>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default DashboardScreen;
