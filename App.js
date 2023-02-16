import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Provider as PaperProvider,
  MD2DarkTheme,
  ActivityIndicator,
} from "react-native-paper";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/auth/login/LoginScreen";
import RegisterScreen from "./src/screens/auth/register/RegisterScreen";
import MainScreen from "./src/screens/MainScreen";
import { AuthContextProvider, useAuth } from "./src/context/AuthContext";
import { AxiosContextProvider } from "./src/api/axios";
import * as SecureStore from "expo-secure-store";
import Notify from "./src/screens/Notify";
import { NotifyContextProvider } from "./src/context/NotifyContext";
const Stack = createNativeStackNavigator();
const paperTheme = {
  ...MD2DarkTheme,
  colors: {
    ...MD2DarkTheme.colors,
    primary: "#ff6384",
  },
};

const Navigator = () => {
  const { authState, setAuthState, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const loadUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      const info = await SecureStore.getItemAsync("tokens");
      const user = await SecureStore.getItemAsync("user");
      const tokens = JSON.parse(info);
      setAuthState({
        accessToken: tokens.accessToken || null,
        refreshToken: tokens.refreshToken || null,
        authenticated: tokens.accessToken !== null,
      });
      setUser(user);
    } catch (error) {
      setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
      setUser("");
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);
  if (!authState.authenticated) {
    if (loading) {
      return (
        <ActivityIndicator animating={true} color={paperTheme.colors.primary} />
      );
    }
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={authState.authenticated ? "MainScreen" : "Login"}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainScreen"
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <PaperProvider theme={paperTheme}>
        <StatusBar style="light" />
        <AuthContextProvider>
          <AxiosContextProvider>
            <NotifyContextProvider>
              <Navigator />
              <Notify />
            </NotifyContextProvider>
          </AxiosContextProvider>
        </AuthContextProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  global: {
    backgroundColor: "#121212",
  },
});
