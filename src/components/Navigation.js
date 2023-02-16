import { useState } from "react";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import RepairsScreen from "../screens/repairs/RepairsScreen";
import CarsScreen from "../screens/cars/CarsScreen";
import { useAuth } from "../context/AuthContext";
import Profile from "../screens/Profile";
import { useAxios } from "../api/axios";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();

function Navigation() {
  const [index, setIndex] = useState(0);
  const { logout } = useAuth();
  const { authInstance } = useAxios();
  const navigation = useNavigation();
  return (
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Cars"
        component={CarsScreen}
        options={{
          tabBarLabel: "Cars",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car-back" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Repairs"
        component={RepairsScreen}
        options={{
          tabBarLabel: "Repairs",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wrench" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Navigation;
